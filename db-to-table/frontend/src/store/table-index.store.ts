import axios, { AxiosResponse } from "axios";
import { makeObservable, observable, runInAction } from "mobx";
import { NavigateFunction, Params, useParams } from "react-router";
export interface TableIndexState {
  isPageLoading: boolean;
  isInitialized: boolean;
  tableNames: string[];
  tableData: any[];
  currentPage: number;
  currentTable: string;
  countRecord: number;
  totalPages: number;
  tableColumns: {
    column_name: string;
    data_type: string;
    is_nullable: string;
  }[];
}
export class TableIndexStore {
  constructor(private readonly env: ImportMetaEnv) {
    const params = useParams();
    makeObservable(this, {
      state: observable,
    });
    this.state = {
      isPageLoading: false,
      isInitialized: false,
      currentPage: parseInt(params.page_number ?? "1"),
      currentTable: params.table_name ?? "",
      countRecord: 0,
      totalPages: 0,
      tableNames: [],
      tableData: [],
      tableColumns: [],
    };

    this.changePage = this.changePage.bind(this);
  }

  state: TableIndexState;

  currentPage() {
    return this.state.currentPage;
  }
  tableName() {
    return this.state.currentTable;
  }

  changePage(page: number) {
    window.history.pushState({}, "", `/table/${this.tableName()}/page/${page}`);
    runInAction(() => (this.state.currentPage = page));
    this.fetchDataOnPage(page);
  }

  async initialize() {
    const tableNamesResult = await axios.get(
      this.env.VITE_API_HOST + "/api/table"
    );

    let tableColumnResult: AxiosResponse;
    if (this.state.currentTable) {
      tableColumnResult = await axios.get(
        this.env.VITE_API_HOST +
          "/api/table/" +
          this.state.currentTable +
          "/schema"
      );
      await this.fetchDataOnPage(this.currentPage());
    }

    runInAction(() => {
      this.state.tableNames = tableNamesResult.data.map(
        (k: any) => k.tableName
      );
      if (this.state.currentTable) {
        this.state.tableColumns = tableColumnResult.data.columns;
      }
      this.state.isInitialized = true;
    });
  }

  async fetchDataOnPage(page: number) {
    const tableDataResult = await axios.get(
      this.env.VITE_API_HOST +
        "/api/table/" +
        this.state.currentTable +
        "?page=" +
        page
    );
    runInAction(() => {
      this.state.tableData = tableDataResult.data.rows;
      this.state.countRecord = tableDataResult.data.countRecord;
      this.state.totalPages = tableDataResult.data.totalPages;
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
