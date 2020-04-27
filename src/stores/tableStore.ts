import { action, observable, reaction } from 'mobx';

type Data = Array<{
  cases: number;
  country: string;
}>

export type SortDir = 'default' | 'up' | 'down';

class TableStore {
  private cachedData = [];

  @observable dir: SortDir = 'default';
  @observable data: Data = [];

  constructor() {
    reaction(
      () => this.dir,
      dir => this.updateData(dir)
    )
  }

  @action setData = (data: any) => {
    this.data = data;
    this.cachedData = data;
  }

  @action updateData = (dir: SortDir) => {
    if (dir === 'default') {
      return this.data = this.cachedData;
    }

    this.data = this.data.sort(
      (a, b) => dir === 'down'
        ? a.cases - b.cases
        : b.cases - a.cases
    )
  }

  @action setSort = () => {
    switch(this.dir) {
      case 'up':
        this.dir = 'default'; break;

      case 'down':
        this.dir = 'up'; break;

      case 'default':
        this.dir = 'down'; break;

      default: throw new Error('Unexpected dir');
    }
  }
}

export { TableStore };