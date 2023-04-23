import { ProductI } from "./Product";

export interface CategoryI {
  id: string;
  description: string;
  parent: ProductI;
  children: ProductI[];
  name: string;
}