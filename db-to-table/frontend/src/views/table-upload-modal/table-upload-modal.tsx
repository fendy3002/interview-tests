import { Button } from "@/components/ui/button";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { TableUploadModalStore } from "@/store/table-upload-modal.store";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { UploadZone } from "./upload-zone";
import { UploadInfo } from "./upload-info";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@radix-ui/react-alert-dialog";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import { uiCatch } from "@/lib/ui-catch";

export const TableUploadModalObserver = observer<{
  store: TableUploadModalStore;
  onClose: () => void;
  onViewTable: (tableName: string) => void;
}>(({ store, onClose, onViewTable }) => {
  return (
    <>
      <Button onClick={() => store.openDialog()}>+ Create Table</Button>
      <div className="overflow y-scroll">
        <AlertDialog open={store.state.dialog.open}>
          {/* Black Overlay */}
          {store.state.dialog.open && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
          )}
          <AlertDialogContent className="fixed bg-white p-6 shadow-lg rounded-lg z-50 max-w-md transform -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 mx-auto h-auto">
            <AlertDialogHeader>
              <AlertDialogTitle>Create Table By Loading CSV</AlertDialogTitle>
              <AlertDialogDescription>
                Drag and drop the csv that you want to load
              </AlertDialogDescription>
              {!store.state.uploadedFile && (
                <>
                  <div className="flex py-4">
                    <UploadZone
                      onDrop={(acceptedFiles: File[]) =>
                        uiCatch(async () => store.uploadFile(acceptedFiles), "")
                      }
                    />
                  </div>

                  <DialogFooter>
                    <Button
                      onClick={() => store.closeDialog()}
                      variant="secondary"
                    >
                      Cancel
                    </Button>
                  </DialogFooter>
                </>
              )}
              {store.state.job && (
                <UploadInfo
                  file={store.state.uploadedFile!}
                  job={store.state.job}
                  onClose={() => {
                    store.closeDialog();
                    onClose();
                  }}
                  onViewTable={(tableName) => {
                    store.closeDialog();
                    onViewTable(tableName);
                  }}
                />
              )}
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
});

export const TableUploadModal = (props: {
  onClose: () => void;
  onViewTable: (tableName: string) => void;
}) => {
  const [tableUploadModalStore] = useState(
    new TableUploadModalStore(import.meta.env)
  );
  return (
    <TableUploadModalObserver
      store={tableUploadModalStore}
      onClose={props.onClose}
      onViewTable={props.onViewTable}
    ></TableUploadModalObserver>
  );
};
