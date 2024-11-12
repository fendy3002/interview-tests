import { Process, Processor } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { IImportCsvJobDto } from 'src/model/import-csv-job.dto';
import { TableDataPopulateService } from 'src/service/table-file-import/table-data-populate.service';

@Injectable()
@Processor('table-data-populate')
export class TableDataPopulateProcessor {
  constructor(
    private readonly tableDataPopulateService: TableDataPopulateService,
  ) {}
  private readonly logger = new Logger(TableDataPopulateProcessor.name);

  @Process()
  async handle(job: Job<IImportCsvJobDto>) {
    this.logger.log(`start:`, job.data);
    await this.tableDataPopulateService.populateData(job.data);
  }
}
