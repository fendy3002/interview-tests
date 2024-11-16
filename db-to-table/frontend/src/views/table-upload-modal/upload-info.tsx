import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";

export const UploadInfo = (props: {
  file: File;
  job: { id: string; status: string; resultingTableName?: string };
  onClose: () => void;
  onViewTable: (tableName: string) => void;
}) => {
  if (props.job.status === "DONE") {
    return (
      <>
        <div className="flex direction-column h-[100px] pt-[10px]">
          <div className="flex-grow">{props.file.name}</div>
          <span className="text-green-600">
            <CheckCircle />
          </span>
        </div>
        <DialogFooter>
          <Button onClick={() => props.onClose()} variant="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => props.onViewTable(props.job.resultingTableName!)}
          >
            View Table
          </Button>
        </DialogFooter>
      </>
    );
  } else {
    return (
      <>
        <span>{props.file.name}</span> <span>Uploading...</span>
      </>
    );
  }
};
