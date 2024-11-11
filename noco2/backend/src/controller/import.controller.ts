import { Controller, Get, Post } from '@nestjs/common';
import { ImportService } from 'src/service/import/import.service';

@Controller('/api/table/import')
export class ImportController {
  constructor(private readonly importService: ImportService) {}

  // TODO: have multer setup
  @Post('/csv')
  postImportCsv() {}
}
