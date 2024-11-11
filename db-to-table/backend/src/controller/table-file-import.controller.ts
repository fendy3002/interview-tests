import { Controller, Post } from '@nestjs/common';
import { TableFileImportService } from 'src/service/table-file-import/table-file-import.service';

@Controller('/api/table/import')
export class TableFileImportController {
  constructor(
    private readonly tableFileImportService: TableFileImportService,
  ) {}

  // TODO: have multer setup
  @Post('/csv')
  postImportCsv() {}
}
