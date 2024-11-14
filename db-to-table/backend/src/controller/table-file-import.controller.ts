import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TableFileImportService } from 'src/service/table-file-import/table-file-import.service';
import { bufferToReadable } from 'src/tool/buffer-to-readable.tool';
import { Readable } from 'stream';

@Controller('/api/table/import')
export class TableFileImportController {
  constructor(
    private readonly tableFileImportService: TableFileImportService,
  ) {}

  @Get('/:id')
  async getImportRequestInfo(@Param('id') id: string) {
    return await this.tableFileImportService.getImportRequestInfo(id);
  }

  // FIXME: setup file limit
  @Post('/csv')
  @UseInterceptors(FileInterceptor('file'))
  async postImportCsv(@UploadedFile() file: Express.Multer.File) {
    return await this.tableFileImportService.importCsv({
      filename: file.originalname,
      file: bufferToReadable(file.buffer),
    });
  }
}
