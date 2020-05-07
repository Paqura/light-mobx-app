import { action, observable, reaction } from 'mobx';

export interface TableItem {
  country: string;
  cases: number;
  countryInfo: { flag: string };
  deaths: number;
}

export type SortDir = 'default' | 'up' | 'down';

class TableStore {
  private cachedData = [];

  @observable direction: SortDir = 'default';
  @observable data: TableItem[] = [];

  constructor() {
    reaction(
      () => this.direction,
      direction => this.updateData(direction)
    )
  }

  @action setData = (data: any) => {
    this.data = data;
    this.cachedData = data;
  }

  @action updateData = (direction: SortDir) => {
    if (direction === 'default') {
      return this.data = this.cachedData;
    }

    this.data = this.data.sort(
      (a, b) => direction === 'down'
        ? a.cases - b.cases
        : b.cases - a.cases
    )
  }

  @action setSort = () => {
    switch(this.direction) {
      case 'up':
        this.direction = 'default'; break;

      case 'down':
        this.direction = 'up'; break;

      case 'default':
        this.direction = 'down'; break;

      default: throw new Error('Unexpected direction');
    }
  }
}

export { TableStore };