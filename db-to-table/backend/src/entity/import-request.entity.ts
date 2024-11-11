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

  @Column({ name: 'status', type: 'simple-enum' })
  status: ImportRequestStatus;

  @Column({ name: 'resulting_table_name' })
  resultingTableName: string;

  @Column({ name: 'error_messages' })
  errorMessages: string;

  @Column({ name: 'total_rows' })
  totalRows: number;

  @Column({ name: 'imported_rows' })
  importedRows: number;
}
