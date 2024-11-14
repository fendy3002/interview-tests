import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { TableIndexStore } from "../store/table-index.store";
import { TableList } from "./table-index/table-list";
import { TableData } from "./table-index/table-data";

export const TableIndexPageObserver = observer<{
  tableIndexStore: TableIndexStore;
}>(({ tableIndexStore }) => {
  useEffect(() => {
    tableIndexStore.initialize();
  }, []);
  return (
    <>
      <div className="flex">
        <div className="flex-auto">
          <TableList tableNames={[]}></TableList>
        </div>
        <div className="flex-auto">
          <TableData></TableData>
        </div>
      </div>
    </>
  );
});

export function TableIndexPage() {
  const [tableIndexStore] = useState(new TableIndexStore());
  return <TableIndexPageObserver tableIndexStore={tableIndexStore} />;
}
