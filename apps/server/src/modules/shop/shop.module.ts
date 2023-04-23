import { Module } from '@nestjs/common';
import { ProductController } from './controller/product.controller';
import { ItemService, ProductService } from './services';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './models/product.model';
import { Item, ItemSchema } from './models';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Item.name, schema: ItemSchema },
    ]),
  ],
  controllers: [ProductController],
  providers: [ItemService, ProductService],
})
export class ShopModule {}
