import { Item } from "./item";
export interface PlayerItem {
    userId: number;
    itemId: number;
    itemCount: number;
    item: Item;
  }
  