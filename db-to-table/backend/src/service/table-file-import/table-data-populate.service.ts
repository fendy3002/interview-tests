import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { ImportRequest } from 'src/entity/import-request.entity';
import { DataSource } from 'typeorm';
import { CsvFileParserService } from './csv-file-parser.service';
import { StorageService } from '../storage/storage.service';

const POPULATE_BATCH_SIZE = 1000;

@Injectable()
export class TableDataPopulateService {
  constructor(
    private readonly storageService: StorageService,
    private readonly csvFileParserService: CsvFileParserService,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async populateDataFromImportRequestId(id: string) {
    const importRequest = await this.dataSource
      .getRepository(ImportRequest)
      .findOneOrFail({
        where: {
          id,
        },
      });
    if (importRequest.importedRows >= importRequest.totalRows) {
      return;
    }
    switch (importRequest.filetype) {
      case 'csv': {
        await this.populateDataFromCsv(importRequest);
      }
    }
  }

  async populateDataFromCsv(importRequest: ImportRequest) {
    const fileStream = await this.storageService.download({
      objectName: importRequest.fileurl,
    });
    let importedRowCount = importRequest.importedRows;
    let batchSize = 0;
    do {
      const csvData =
        await this.csvFileParserService.parseCsvFromReadableRanged(fileStream, {
          from: importedRowCount + 1,
          to: importedRowCount + POPULATE_BATCH_SIZE,
        });
      batchSize = csvData.rows.length;

      const tableName = importRequest.resultingTableName;
      await this.dataSource.transaction(async (em) => {
        await em
          .createQueryBuilder()
          .insert()
          .into(tableName)
          .values(csvData.rows)
          .execute();
        await em.getRepository(ImportRequest).update(
          {
            id: importRequest.id,
          },
          {
            importedRows: importedRowCount,
          },
        );
      });
    } while (batchSize === POPULATE_BATCH_SIZE);
  }
}
