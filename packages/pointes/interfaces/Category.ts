import { ProductI } from "./Product";

export interface CategoryI {
  name: string;
  description: string;
  icon?: string;
  parent: ProductI;
  code: string;
}