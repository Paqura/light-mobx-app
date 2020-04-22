import { createContext, useContext } from "react"
import { CounterStore } from "./counterStore";

class RootStore {
  counterStore = new CounterStore()
}

const rootStore = new RootStore();
const counterStoreContext = createContext(rootStore.counterStore);
const useCounterStore = () => useContext(counterStoreContext);

export { useCounterStore }