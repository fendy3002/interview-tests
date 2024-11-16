import { Card, CardContent } from "@/components/ui/card";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
export const UploadZone = ({
  onDrop,
}: {
  onDrop: <T extends File>(
    acceptedFiles: T[],
    fileRejections: FileRejection[],
    event: DropEvent
  ) => void;
}) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: onDrop,
    accept: {
      "text/csv": [".csv"],
    },
    multiple: false,
  });

  return (
    <Card>
      <CardContent>
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>Drop your document here or browse file</p>
          <p>
            <small>Supported: CSV</small>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
