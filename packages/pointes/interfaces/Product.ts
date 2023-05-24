export interface ProductI {
  id: string;

  title: string;

  image: string;

  description?: string;

  bgColor?: string;

  categories: any[];

  brand?: string;

  price: number;

  discount?: number;

  sold: number;

  quantity: number;

  status: number; // 12 - active, 1 - cancel, 0 - pending

  supplier: any;

  images: { url: string; blurHash: string }[];

  items: any[];

  createdAt: string;

  updatedAt: string;
}
