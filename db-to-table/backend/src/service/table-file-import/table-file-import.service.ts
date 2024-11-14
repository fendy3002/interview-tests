import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { Queue } from 'bull';
import { ImportRequest } from 'src/entity/import-request.entity';
import { ImportRequestStatus } from 'src/enum/import-request.status.enum';
import { IImportCsvJobDto } from 'src/model/import-csv-job.dto';
import { IImportCsvRequestDto } from 'src/model/import-csv-request.dto';
import { DataSource, EntityManager } from 'typeorm';
import { v6 as uuid } from 'uuid';
import { StorageService } from '../storage/storage.service';
import { CsvFileParserService } from './csv-file-parser.service';
import * as path from 'path';
import { TableDataPopulateService } from './table-data-populate.service';
import { errorToString } from 'src/tool/error-log.tool';

// can use v4 uuid if want

const TABLE_NAME_SUFFIX_REGEX = /^.+_(\d+)$/;

@Injectable()
export class TableFileImportService {
  constructor(
    private readonly storageService: StorageService,
    private readonly csvFileParserService: CsvFileParserService,
    private readonly tableDataPopulateService: TableDataPopulateService,
    @InjectQueue('table-file-import-csv')
    private readonly tableFileImportProcessor: Queue<IImportCsvJobDto>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}
  logger = new Logger(TableFileImportService.name);

  async getImportRequestInfo(id: string) {
    return await this.dataSource.getRepository(ImportRequest).findOneOrFail({
      where: {
        id,
      },
    });
  }

  async importCsv(request: IImportCsvRequestDto) {
    await this.storageService.upload({
      objectName: request.filename,
      stream: request.file,
      // FIXME: determine content type from extension
      contentType: 'text/csv',
    });
    const importRequestId = uuid();
    await this.dataSource.getRepository(ImportRequest).save({
      id: importRequestId,
      filename: request.filename,
      fileurl: request.filename,
      status: ImportRequestStatus.PENDING,
      createdAt: new Date(),
      filetype: 'text/csv',
    });

    await this.pushJobForImportProcess({
      id: importRequestId,
    });
    return {
      jobId: importRequestId,
    };
  }

  async pushJobForImportProcess(job: IImportCsvJobDto) {
    await this.tableFileImportProcessor.add(job);
  }

  async handleJob(job: IImportCsvJobDto) {
    try {
      await this.initiateCsvData(job.id);
    } catch (ex) {
      this.logger.error(errorToString(ex));
    }
  }

  async initiateCsvData(id: string) {
    const importRequest = await this.dataSource
      .getRepository(ImportRequest)
      .findOne({
        where: {
          id: id,
        },
      });
    const fileStream = await this.storageService.download({
      objectName: importRequest.fileurl,
    });

    const csvData: {
      headers: string[];
      rows: any[];
    } = await this.csvFileParserService.parseCsvFromReadableRanged(fileStream, {
      from: 1,
      to: 2,
    });

    const columns = csvData.headers.map((header) => {
      return `  ${this.dataSource.driver.escape(header)} TEXT,`;
    });
    try {
      await this.dataSource.transaction(async (em) => {
        const tableName = await this.getAvalableTableName(
          em,
          path.parse(importRequest.filename).name,
        );
        this.logger.log('Create table with name: ' + tableName);
        const primaryKeyName = this.dataSource.driver.escape(tableName + '_pk');

        const createTableQuery = [
          `CREATE TABLE ${this.dataSource.driver.escape(tableName)} (`,
          `  id BIGSERIAL,`,
          ...columns,
          `  constraint ${primaryKeyName} primary key (id)`,
          `)`,
        ].join(' ');

        // create the associated table
        await em.query(createTableQuery);

        // update the import request
        await em.getRepository(ImportRequest).update(
          {
            id,
          },
          {
            status: ImportRequestStatus.DATA_POPULATION,
            importedRows: 0,
            // not used yet, I try to approach it with a ranged parsing instead
            totalRows: 0,
            resultingTableName: tableName,
          },
        );
      });
    } catch (ex) {
      // for now, just make the import request failed
      // in reality, we can check the error type and determine whether it can be retried or not
      this.logger.error(errorToString(ex));

      await this.dataSource.getRepository(ImportRequest).update(
        {
          id,
        },
        {
          status: ImportRequestStatus.FAILED,
          errorMessages: errorToString(ex),
        },
      );
      return;
    }
    await this.tableDataPopulateService.pushJobForPopulateData({ id });
  }

  async getAvalableTableName(em: EntityManager, tableName: string) {
    // if the name has been taken, append with _1
    // if there exists an _1, increment it
    // some optimization can be made with query
    // but this works for now
    const postgresQuery = `SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE'
      AND table_name = $1;`;
    const result = await em.query(postgresQuery, [tableName]);
    if (result.length > 0) {
      const tableSuffix = tableName.match(TABLE_NAME_SUFFIX_REGEX);

      if (tableSuffix) {
        const suffixNumber = tableSuffix[1]; // Output: 1
        const newTableName = tableName.replace(
          new RegExp(suffixNumber + '$'),
          (parseInt(suffixNumber) + 1).toString(),
        );
        return await this.getAvalableTableName(em, newTableName);
      } else {
        const newTableName = tableName + '_1';
        return await this.getAvalableTableName(em, newTableName);
      }
    }
    return tableName;
  }
}
