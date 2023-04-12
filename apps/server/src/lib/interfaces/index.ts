export interface ProductI {
  title: string;
  image: string;
  description?: string;
  bgColor?: string;
  category: string;
  brand?: string;
  price: number;
  discount?: number;
  sold: number;
  quantity: number;
  status: string;
  supplier: any;
  options: {
    configName: string;
    value: string;
  }[];
  images: {
    url: string;
    blurHash: string
  }[]
  items: any[]
}

export interface ItemI {
  altTxt: string;
  image: string;
  sku: string;
  upc: string;
  price: string;
  product: any
}