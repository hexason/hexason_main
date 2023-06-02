import { Module } from '@nestjs/common';

import * as controllers from './controller';
import * as services from './services';
import * as resolvers from './resolver';

import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './models/product.model';
import { Category, CategorySchema, Item, ItemSchema, Supplier, SupplierSchema } from './models';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';

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
  providers: [...Object.values(services), ...Object.values(resolvers)],
})
export class ShopModule {}
