import { Readable } from "stream";

export interface IImportCsvRequestDto {
  file: Readable;
  filename: string;
}
