export interface ITableRowsResponseDto {
  data: { [key: string]: string }[];
  totalRows: number;
  page: number;
}
