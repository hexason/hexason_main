import { Module } from '@nestjs/common';
import * as controllers from './controller';
import { ItemService, ProductService, SupplierService } from './services';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './models/product.model';
import { Category, CategorySchema, Item, ItemSchema } from './models';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { ProductResolver } from './resolver/product.resolver';
import { Supplier, SupplierSchema } from './models/supplier.model';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: true,
    }),
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Item.name, schema: ItemSchema },
      { name: Supplier.name, schema: SupplierSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: Object.values(controllers),
  providers: [ItemService, ProductService, ProductResolver, SupplierService],
})
export class ShopModule {}
