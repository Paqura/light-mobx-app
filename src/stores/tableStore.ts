import { action, observable, reaction } from 'mobx';

export const data = [
  { name: 'slava', age: 28 },
  { name: 'kostya', age: 21 },
  { name: 'egor', age: 12 },
  { name: 'oleg', age: 55 },
  { name: 'borya', age: 75 },
  { name: 'igor', age: 43 },
  { name: 'semen', age: 36 },
  { name: 'valera', age: 32 },
  { name: 'gosha', age: 12 },
  { name: 'sasha', age: 79 },
]

type Data = Array<{
  name: string,
  age: number
}>

export type SortDir = 'default' | 'up' | 'down';

class TableStore {
  private cachedData = data;

  @observable dir: SortDir = 'default';
  @observable data: Data = data;

  constructor() {
    reaction(
      () => this.dir,
      dir => this.updateData(dir)
    )
  }

  @action updateData = (dir: SortDir) => {
    if (dir === 'default') {
      return this.data = this.cachedData;
    }

    this.data = this.data.sort(
      (a, b) => dir === 'down'
        ? a.age - b.age
        : b.age - a.age
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