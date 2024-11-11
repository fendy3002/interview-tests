export enum IImportJobStatus {
  PENDING,
  FAILED,
  SUCCESS
}

export interface IImportJobDto {
  jobId: string;
  createdAt: Date;
  filename: string;
  fileurl: string;
  status: string;
  errorMessage: string;
  resultingTable: string;
}
