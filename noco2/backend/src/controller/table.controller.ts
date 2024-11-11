import { Controller, Get } from '@nestjs/common';
import { TableService } from 'src/service/table/table.service';

@Controller('/api/table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Get('/')
  getListTable() {}
}
