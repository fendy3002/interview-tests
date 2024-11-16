import { Controller, Get, Param, Query } from '@nestjs/common';
import { TableService } from 'src/service/table/table.service';

@Controller('/api/table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Get('/')
  async getListTable() {
    return await this.tableService.getListTable();
  }
  @Get('/:table_name')
  async getTableData(
    @Param('table_name') tableName: string,
    @Query('page') page?: string,
  ) {
    return await this.tableService.getTableData(tableName, {
      page: page ? parseInt(page) : 1,
    });
  }
  @Get('/:table_name/schema')
  async getTableSchema(@Param('table_name') tableName: string) {
    return await this.tableService.getTableSchema(tableName);
  }
}
