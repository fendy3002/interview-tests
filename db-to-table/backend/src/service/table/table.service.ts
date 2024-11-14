import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

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

  async getTableData(tableName: string) {
    const query = [
      `SELECT *`,
      `FROM ${this.dataSource.driver.escape(tableName)} `,
    ].join(' ');
    const result = await this.dataSource.query(query);
    return result;
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
