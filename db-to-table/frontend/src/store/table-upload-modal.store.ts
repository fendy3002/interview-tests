import { makeObservable, observable, runInAction } from "mobx";
import axios, { AxiosResponse } from "axios";

export interface TableUploadModalState {
  uploadedFile?: File;
  job?: {
    id: string;
    status: string;
    resultingTableName?: string;
  };
  dialog: {
    open: boolean;
  };
}
export class TableUploadModalStore {
  constructor(private readonly env: ImportMetaEnv) {
    makeObservable(this, {
      state: observable,
    });
    this.state = {
      uploadedFile: undefined,
      dialog: {
        open: false,
      },
    };
    this.uploadFile = this.uploadFile.bind(this);
  }
  state: TableUploadModalState;

  openDialog() {
    this.state.dialog.open = true;
    this.state.job = undefined;
    this.state.uploadedFile = undefined;
  }

  closeDialog() {
    this.state.dialog.open = false;
    this.state.job = undefined;
    this.state.uploadedFile = undefined;
  }

  async uploadFile(acceptedFiles: File[]) {
    if (acceptedFiles[0]) {
      runInAction(() => {
        this.state.uploadedFile = acceptedFiles[0];
      });
      const form = new FormData();
      form.append("file", acceptedFiles[0]);

      const createdJob = (
        await axios.post(
          this.env.VITE_API_HOST + "/api/table/import/csv",
          form,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
      ).data;
      runInAction(() => {
        this.state.job = {
          id: createdJob.jobId,
          status: "PENDING",
        };
      });
    }
  }
}
