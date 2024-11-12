import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { Queue } from 'bull';
import { ImportRequest } from 'src/entity/import-request.entity';
import { ImportRequestStatus } from 'src/enum/import-request.status.enum';
import { IImportCsvJobDto } from 'src/model/import-csv-job.dto';
import { IImportCsvRequestDto } from 'src/model/import-csv-request.dto';
import { DataSource } from 'typeorm';
import { v6 as uuid } from 'uuid';
import { StorageService } from '../storage/storage.service';
import { CsvFileParserService } from './csv-file-parser.service';
import * as path from 'path';
import { TableDataPopulateService } from './table-data-populate.service';

// can use v4 uuid if want

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
      //TODO: better error logging
      console.log(ex);
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
    // TODO: check if table name is already exists or not, if yes, append with _1 or _2
    const tableName = path.parse(importRequest.filename).name;
    const primaryKeyName = this.dataSource.driver.escape(tableName + '_pk');

    const columns = csvData.headers.map((header) => {
      return `  "${header}" TEXT,`;
    });
    await this.dataSource.transaction(async (em) => {
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
    await this.tableDataPopulateService.pushJobForPopulateData({ id });
  }
}
