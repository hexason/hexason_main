import { Module } from '@nestjs/common';

import * as controllers from './controller';
import * as services from './services';
import * as resolvers from './resolver';
import * as models from './models';

import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: true,
    }),
    MongooseModule.forFeature(
      Object.keys(models)
        .filter((e: any) => models[e].name && models[e + 'Schema'])
        .map((model) => ({ name: models[model].name, schema: models[model + 'Schema'] })),
    ),
  ],
  controllers: Object.values(controllers),
  providers: [...Object.values(services), ...Object.values(resolvers)],
  exports: [...Object.values(services)],
})
export class ShopModule {}
