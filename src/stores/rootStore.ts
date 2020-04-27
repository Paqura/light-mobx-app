import { createContext, useContext } from "react"
import { TableStore } from "./tableStore";
import { NotificationStore } from "./notificationStore";

class RootStore {
  tableStore = new TableStore();
  notificationStore = new NotificationStore();
}

const rootStore = new RootStore();

const tableStoreContext = createContext(rootStore.tableStore);
const useTableStore = () => useContext(tableStoreContext);

const notificationStoreContext = createContext(rootStore.notificationStore);
const useNotificationStore = () => useContext(notificationStoreContext);

export { useTableStore, useNotificationStore }