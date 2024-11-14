import { makeObservable, observable } from "mobx";

export interface TableIndexState {
  isPageLoading: boolean;
  isInitialized: boolean;
  tableNames: string[];
}
export class TableIndexStore {
  constructor() {
    makeObservable(this, {
      state: observable,
    });
    this.state = {
      isPageLoading: false,
      isInitialized: false,
      tableNames: [],
    };
  }

  state: TableIndexState;

  async initialize() {
    this.state.isInitialized = true;
  }
}
