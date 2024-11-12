import { TableDataPopulateProcessor } from './table-data-populate.processor';
import { TableFileImportCsvProcessor } from './table-file-import-csv.processor';

export const JobProcessorModules = [
  TableFileImportCsvProcessor,
  TableDataPopulateProcessor,
];
