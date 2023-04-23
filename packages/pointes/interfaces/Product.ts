import { CategoryI } from "./Category";
import { ItemI } from "./Item";

export interface ProductI {
  title: string;
  image: string;
  description?: string;
  bgColor?: string;
  brand?: string;
  price: number;
  discount?: number;
  sold: number;
  quantity: number;
  status: number;
  supplier: any;
  category: CategoryI[];
  images: {
    url: string;
    blurHash: string;
  }[];
  items: ItemI[];
}