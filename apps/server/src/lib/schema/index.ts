export * from './product.model';
export * from './item.model';
export * from './supplier.model';
export * from './category.model';
export * from './chat.model';
export * from './train.model';

import { Product, ProductSchema } from './product.model';
import { Item, ItemSchema } from './item.model';
import { Supplier, SupplierSchema } from './supplier.model';
import { Category, CategorySchema } from './category.model';
import { Chat, ChatSchema } from './chat.model';
import { TrainGpt, TrainGptSchema } from './train.model';

export const SchemaFormats = [
  { name: Product.name, schema: ProductSchema },
  { name: Item.name, schema: ItemSchema },
  { name: Supplier.name, schema: SupplierSchema },
  { name: Category.name, schema: CategorySchema },
  { name: Chat.name, schema: ChatSchema },
  { name: TrainGpt.name, schema: TrainGptSchema },
];
