import { ProductI } from "./Product";

export interface CategoryI {
  description: string;
  icon?: string;
  parent: ProductI;
  name: string;
  code: string;
}