import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

const PAGE_LIMIT = 50;

@Injectable()
export class TableService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async getListTable() {
    const query = [
      `SELECT table_name as "tableName"`,
      `FROM information_schema.tables `,
      `WHERE table_schema = 'public' `,
      `  AND table_type = 'BASE TABLE' `,
      `  AND table_name not IN ('migrations')`,
      `ORDER BY table_name asc;`,
    ].join(' ');
    const result = await this.dataSource.query(query);
    return result;
  }

  async getTableData(tableName: string, searchParam: { page: number }) {
    const query = [`FROM ${this.dataSource.driver.escape(tableName)} `].join(
      ' ',
    );

    const rowResults = await this.dataSource.query(
      [
        `SELECT *`,
        query,
        `LIMIT ${PAGE_LIMIT}`,
        `OFFSET ${(searchParam.page - 1) * PAGE_LIMIT}`,
      ].join(' '),
    );
    const countResult = await this.dataSource.query(
      ['SELECT count(*) as count_record', query].join(' '),
    );
    return {
      rows: rowResults,
      rowCount: countResult[0].count_record,
      totalPages: Math.ceil(countResult[0].count_record / PAGE_LIMIT),
    };
  }

  async getTableSchema(tableName: string) {
    const query = [
      `SELECT column_name, data_type, is_nullable, column_default`,
      `FROM information_schema.columns`,
      `WHERE table_name = $1`,
    ].join(' ');
    const result = await this.dataSource.query(query, [tableName]);
    return {
      columns: result,
    };
  }
}
