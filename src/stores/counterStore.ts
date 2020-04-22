import { action, observable } from 'mobx';

class CounterStore {
  @observable count: number = 0;

  @action increment = () => {
    this.count = this.count + 1;
  }
}

export { CounterStore }