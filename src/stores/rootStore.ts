import { createContext, useContext } from "react"
import { TableStore } from "./tableStore";

class RootStore {
  tableStore = new TableStore();
}

const rootStore = new RootStore();

const tableStoreContext = createContext(rootStore.tableStore);
const useTableStore = () => useContext(tableStoreContext);

export { useTableStore }