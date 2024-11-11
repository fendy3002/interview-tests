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

// can use v4 uuid if want

@Injectable()
export class TableFileImportService {
  constructor(
    private readonly storageService: StorageService,
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
    });

    return {
      jobId: importRequestId,
    };
  }

  async pushJobForImportProcess(job: IImportCsvJobDto) {
    await this.tableFileImportProcessor.add(job);
  }

  async processCsvData(job: IImportCsvJobDto) {
    const importRequest = await this.dataSource
      .getRepository(ImportRequest)
      .findOne({
        where: {
          id: job.id,
        },
      });

    // TODO: library to read and parse csv
    const csvData: {
      headers: string[];
      rows: any[];
    } = {
      headers: ['Col1', 'Col2', 'Col3'],
      rows: [],
    };

    // TODO: check if table name is already exists or not, if yes, append with _1 or _2
    const tableName = importRequest.filename;
    /**
     Col1 VARCHAR(200),
     */
    const columns = csvData.headers.map((header) => {
      return `  "${header}" TEXT,`;
    });
    await this.dataSource.transaction(async (em) => {
      await em.query(
        [
          `CREATE TABLE ${tableName} (`,
          `  id BIGSERIAL,`,
          ...columns,
          `  primary key ${tableName}_pk (id)`,
          `)`,
        ].join(' '),
      );
      // FIXME: this can be improved with batches like 50 or 100 rows per insert
      await em
        .createQueryBuilder()
        .insert()
        .into(tableName)
        .values(csvData.rows)
        .execute();
    });
  }
}
