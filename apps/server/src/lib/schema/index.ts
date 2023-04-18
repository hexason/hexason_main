export * from './product.model';
export * from './item.model';
export * from './supplier.model';
export * from './category.model';

import { Product, ProductSchema } from './product.model';
import { Item, ItemSchema } from './item.model';
import { Supplier, SupplierSchema } from './supplier.model';
import { Category, CategorySchema } from './category.model';

export const SchemaFormats = [
  { name: Product.name, schema: ProductSchema },
  { name: Item.name, schema: ItemSchema },
  { name: Supplier.name, schema: SupplierSchema },
  { name: Category.name, schema: CategorySchema },
];
