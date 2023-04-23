import { Module } from '@nestjs/common';
import * as controllers from './controller';
import { ItemService, ProductService } from './services';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './models/product.model';
import { Category, CategorySchema, Item, ItemSchema, Supplier, SupplierSchema } from './models';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Item.name, schema: ItemSchema },
      { name: Supplier.name, schema: SupplierSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: Object.values(controllers),
  providers: [ItemService, ProductService],
})
export class ShopModule {}
