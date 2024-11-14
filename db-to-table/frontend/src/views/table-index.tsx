import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { TableIndexStore } from "../store/table-index.store";
import { TableData } from "./table-index/table-data";
import { TableList } from "./table-index/table-list";

export const TableIndexPageObserver = observer<{
  tableIndexStore: TableIndexStore;
}>(({ tableIndexStore }) => {
  useEffect(() => {
    tableIndexStore.initialize();
    return () => {
      tableIndexStore.destroy();
    };
  }, []);
  return (
    <>
      <div className="grid grid-cols-[20%_80%] w-full">
        <div>
          <TableList tableNames={tableIndexStore.state.tableNames}></TableList>
        </div>
        <div>
          <TableData
            tableColumns={tableIndexStore.state.tableColumns}
            tableData={tableIndexStore.state.tableData}
          ></TableData>
        </div>
      </div>
    </>
  );
});

export function TableIndexPage() {
  const [tableIndexStore] = useState(new TableIndexStore(import.meta.env));
  return <TableIndexPageObserver tableIndexStore={tableIndexStore} />;
}
