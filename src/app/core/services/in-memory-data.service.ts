import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Hero } from '../models/hero.model';
import { Item } from '../models/item.model';

@Injectable()
export class InMemoryDataService extends InMemoryDbService {

  // @ts-ignore
  public createDb(reqInfo?: RequestInfo): any {
    const heroes: Hero[] = [
      { id: 1, name: 'Dr Nice', money: 100, items: [] },
      { id: 2, name: 'Narco', money: 1000, items: [] },
      { id: 3, name: 'Bombasto', money: 1000, items: [] },
      { id: 4, name: 'Celeritas', money: 1000, items: [] },
      { id: 5, name: 'Magneta', money: 1000, items: [] },
      { id: 6, name: 'RubberMan', money: 1000, items: [] },
      { id: 7, name: 'Dynama', money: 1000, items: [] },
      { id: 8, name: 'Dr IQ', money: 1000, items: [] },
      { id: 9, name: 'Magma', money: 1000, items: [] },
      { id: 10, name: 'Tornado', money: 1000, items: [] }
    ];

    const items: Item[] = new Array(10)
      .fill(0)
      .map((_, i) => i + 1)
      .map(id => ({ id, name: `Test Item ${id}`, price: id * 100, isPurchasable: true }));

    return { heroes, items };
  }

  public genId(list?: { id: number }[]): number {
    return list?.length > 0 ? Math.max(...list.map(elem => elem.id)) + 1 : 1;
  }

}
