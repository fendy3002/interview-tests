import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { TableIndexStore } from "../store/table-index.store";
import { TableData } from "./table-index/table-data";
import { TableList } from "./table-index/table-list";
import { TableUploadModal } from "./table-upload-modal/table-upload-modal";

export const TableIndexPageObserver = observer<{
  tableIndexStore: TableIndexStore;
}>(({ tableIndexStore }) => {
  useEffect(() => {
    document.title = "Table data";
    tableIndexStore.initialize();
    return () => {
      tableIndexStore.destroy();
    };
  }, []);
  return (
    <>
      <div className="grid grid-cols-[20%_80%] w-full">
        <div>
          <TableList
            tableNames={tableIndexStore.state.tableNames}
            uploadModal={
              <TableUploadModal
                onClose={() => tableIndexStore.initialize()}
                onViewTable={(tableName) =>
                  (window.location.href = `/table/${tableName}/page/1`)
                }
              />
            }
          ></TableList>
        </div>
        <div>
          <TableData
            tableColumns={tableIndexStore.state.tableColumns}
            tableData={tableIndexStore.state.tableData}
            countRecord={tableIndexStore.state.countRecord}
            totalPages={tableIndexStore.state.totalPages}
            currentPage={tableIndexStore.currentPage()}
            linkToPage={(page) =>
              `/table/${tableIndexStore.tableName()}/page/${page}`
            }
            onChangePage={tableIndexStore.changePage}
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
