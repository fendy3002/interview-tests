import { CsvFileParserService } from './csv-file-parser.service';
import { TableDataPopulateService } from './table-data-populate.service';
import { TableFileImportService } from './table-file-import.service';

export const TableFileImportModules = [
  TableFileImportService,
  TableDataPopulateService,
  CsvFileParserService,
];
