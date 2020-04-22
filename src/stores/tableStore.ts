import { action, observable } from 'mobx';

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

  @action setSort = () => {
    switch(this.dir) {
      case 'up':
        this.dir = 'default'; break;

      case 'down':
        this.dir = 'up'; break;

      case 'default':
        this.dir = 'down'; break;

      default: this.dir = 'default';
    }

    if (this.dir === 'default') {
      return this.data = this.cachedData;
    }

    this.data = this.data.sort((a, b) => {
      if (this.dir === 'down') {
        return a.age - b.age;
      }

      return b.age - a.age;
    })
  }
}

export { TableStore };