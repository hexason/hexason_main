export interface ItemI {
  variations: VariationI[];
  SKU: string;
  UPC?: string;
  price: number;
  status: number;
  stock: number;
  product?: any;
}

export interface VariationI {
  configName: string;
  value: string;
  icon: string;
}