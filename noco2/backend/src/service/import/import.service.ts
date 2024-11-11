import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { IImportCsvRequestDto } from 'src/model/import-csv-request.dto';
import { DataSource } from 'typeorm';

@Injectable()
export class ImportService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}
  async importCsv(request: IImportCsvRequestDto) {
    // TODO: library to read and parse csv
    const csvData: {
      headers: string[];
      rows: any[];
    } = {
      headers: ['Col1', 'Col2', 'Col3'],
      rows: [],
    };
    
    // TODO: check if table name is already exists or not, if yes, append with _1 or _2
    const tableName = request.filename;
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
