import { MigrationInterface, QueryRunner } from 'typeorm';

// there's some cases that typeorm migration sort sql executions
// based on class name instad of filename
// so we put the timestamp at the front
export class M202411112132Init implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      [
        `CREATE TABLE import_request (`,
        `  id uuid NOT NULL,`,
        `  created_at timestamp,`,
        `  filename VARCHAR(200),`,
        `  fileurl TEXT,`,
        `  status VARCHAR(50),`,
        `  resulting_table_name TEXT,`,
        `  error_messages TEXT,`,
        `  total_rows BIGINT,`,
        `  imported_rows BIGINT,`,
        `  constraint import_request_pk primary key (id)`,
        `);`,
      ].join(' '),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
