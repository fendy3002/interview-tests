import { ImportRequestStatus } from 'src/enum/import-request.status.enum';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ImportRequest {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'filename' })
  filename: string;

  @Column({ name: 'fileurl' })
  fileurl: string;

  @Column({ name: 'filetype' })
  filetype: string;

  @Column({ name: 'status', type: 'simple-enum' })
  status: ImportRequestStatus;

  @Column({ name: 'resulting_table_name', nullable: true })
  resultingTableName: string;

  @Column({ name: 'error_messages', nullable: true })
  errorMessages: string;

  @Column({ name: 'total_rows', nullable: true })
  totalRows: number;

  @Column({ name: 'imported_rows', nullable: true })
  importedRows: number;

  // for now can be used to retry populate data
  @Column({ name: 'retry_times', nullable: true })
  retryTimes: number;
}
