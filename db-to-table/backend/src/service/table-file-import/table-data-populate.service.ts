import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { Queue } from 'bull';
import { ImportRequest } from 'src/entity/import-request.entity';
import { ImportRequestStatus } from 'src/enum/import-request.status.enum';
import { IImportCsvJobDto } from 'src/model/import-csv-job.dto';
import { DataSource } from 'typeorm';
import { StorageService } from '../storage/storage.service';
import { CsvFileParserService } from './csv-file-parser.service';

// can be adjusted to match
const POPULATE_BATCH_SIZE = 10000;

@Injectable()
export class TableDataPopulateService {
  constructor(
    private readonly storageService: StorageService,
    private readonly csvFileParserService: CsvFileParserService,
    @InjectQueue('table-data-populate')
    private readonly tableDataPopulateProcessor: Queue<IImportCsvJobDto>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}
  logger = new Logger(TableDataPopulateService.name);

  async pushJobForPopulateData(job: IImportCsvJobDto) {
    await this.tableDataPopulateProcessor.add(job);
  }

  async populateData(job: IImportCsvJobDto) {
    try {
      await this.populateDataFromImportRequestId(job.id);
    } catch (ex) {
      this.logger.error(errorToString(ex));
    }
  }

  async populateDataFromImportRequestId(id: string) {
    const importRequest = await this.dataSource
      .getRepository(ImportRequest)
      .findOneOrFail({
        where: {
          id,
        },
      });
    switch (importRequest.filetype) {
      case 'text/csv': {
        await this.populateDataFromCsv(importRequest);
      }
    }
  }

  async populateDataFromCsv(importRequest: ImportRequest) {
    let importedRowCount = importRequest.importedRows;
    let batchSize = 0;
    do {
      /**
       * this is an approach that limit on memory size
       * but instead it increase connection to storage
       * can be made better by downloading it to temporary file first
       * and opening stream to that temporary file
       */
      const fileStream = await this.storageService.download({
        objectName: importRequest.fileurl,
      });
      const csvData =
        await this.csvFileParserService.parseCsvFromReadableRanged(fileStream, {
          from: importedRowCount + 1,
          to: importedRowCount + POPULATE_BATCH_SIZE,
        });
      batchSize = csvData.rows.length;

      const tableName = importRequest.resultingTableName;
      if (batchSize > 0) {
        this.logger.log(
          `Inserting records ${importedRowCount} to ${importedRowCount + batchSize} to table ${importRequest.resultingTableName} for id ${importRequest.id}`,
        );
        await this.dataSource.transaction(async (em) => {
          await em
            .createQueryBuilder()
            .insert()
            .into(tableName, csvData.headers)
            .values(csvData.rows)
            .execute();

          await em.getRepository(ImportRequest).update(
            {
              id: importRequest.id,
            },
            {
              importedRows: importedRowCount + batchSize,
              retryTimes: 0,
            },
          );
        });
      }
      importedRowCount += batchSize;
    } while (batchSize === POPULATE_BATCH_SIZE);
    await this.dataSource.getRepository(ImportRequest).update(
      {
        id: importRequest.id,
      },
      {
        status: ImportRequestStatus.DONE,
      },
    );
  }
}
