import { Process, Processor } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { IImportCsvJobDto } from 'src/model/import-csv-job.dto';
import { TableFileImportService } from 'src/service/table-file-import/table-file-import.service';

@Injectable()
@Processor('table-file-import-csv')
export class TableFileImportCsvProcessor {
  constructor(
    private readonly tableFileImportService: TableFileImportService,
  ) {}
  private readonly logger = new Logger(TableFileImportCsvProcessor.name);

  @Process()
  async handle(job: Job<IImportCsvJobDto>) {
    this.logger.log(`start:`, job.data);
    await this.tableFileImportService.handleJob(job.data);
  }
}
