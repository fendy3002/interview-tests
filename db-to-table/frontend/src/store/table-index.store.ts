import axios, { AxiosResponse } from "axios";
import { makeObservable, observable, runInAction } from "mobx";
import { Params, useParams } from "react-router";
export interface TableIndexState {
  isPageLoading: boolean;
  isInitialized: boolean;
  tableNames: string[];
  tableData: any[];
  tableColumns: {
    column_name: string;
    data_type: string;
    is_nullable: string;
  }[];
}
export class TableIndexStore {
  constructor(private readonly env: ImportMetaEnv) {
    this.params = useParams();
    makeObservable(this, {
      state: observable,
    });
    this.state = {
      isPageLoading: false,
      isInitialized: false,
      tableNames: [],
      tableData: [],
      tableColumns: [],
    };
  }

  state: TableIndexState;
  params: Readonly<Params<string>>;

  async initialize() {
    const tableNamesResult = await axios.get(
      this.env.VITE_API_HOST + "/api/table"
    );

    let tableDataResult: AxiosResponse;
    let tableColumnResult: AxiosResponse;
    if (this.params.table_name) {
      tableDataResult = await axios.get(
        this.env.VITE_API_HOST + "/api/table/" + this.params.table_name
      );
      tableColumnResult = await axios.get(
        this.env.VITE_API_HOST +
          "/api/table/" +
          this.params.table_name +
          "/schema"
      );
    }

    runInAction(() => {
      this.state.tableNames = tableNamesResult.data.map(
        (k: any) => k.tableName
      );
      if (this.params.table_name) {
        this.state.tableData = tableDataResult.data;
        this.state.tableColumns = tableColumnResult.data.columns;
      }
      this.state.isInitialized = true;
    });
  }
  async destroy() {
    runInAction(() => {
      this.state.tableNames = [];
      this.state.tableData = [];
      this.state.isInitialized = false;
    });
  }
}
