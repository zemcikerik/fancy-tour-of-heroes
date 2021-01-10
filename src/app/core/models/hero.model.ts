import { Item } from './item.model';

export interface Hero {
  id: number;
  name: string;
  money: number;
  items: Item[];
}
