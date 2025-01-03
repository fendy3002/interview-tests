import { Pagination } from "@/components/logic-ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as changeCase from "change-case";
import { observer } from "mobx-react-lite";

export const TableData = observer(
  (props: {
    tableColumns: {
      column_name: string;
      data_type: string;
      is_nullable: string;
    }[];
    tableData: any[];
    currentPage: number;
    countRecord: number;
    totalPages: number;
    linkToPage: (page: number) => string;
    onChangePage: (page: number) => void;
  }) => {
    const columnsDef = props.tableColumns.map((col) => ({
      accessorKey: col.column_name,
      header: changeCase.sentenceCase(col.column_name),
    }));
    const table = useReactTable({
      data: props.tableData,
      columns: columnsDef,
      getCoreRowModel: getCoreRowModel(),
      enableRowPinning: true,
    });
    return (
      <div className="rounded-md border">
        <Table containerClassName="h-[90vh]">
          <TableHeader className="sticky top-0  bg-secondary">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columnsDef.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Pagination
          className="bg-secondary"
          currentPage={props.currentPage}
          totalPage={props.totalPages}
          linkToPage={props.linkToPage}
          onClick={(evt) => {
            evt.preventDefault();
            evt.stopPropagation();
            props.onChangePage(parseInt(evt.currentTarget.dataset.page!));
          }}
          isShowFirstLast={true}
        ></Pagination>
      </div>
    );
  }
);
