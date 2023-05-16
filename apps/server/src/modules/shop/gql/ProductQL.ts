import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from '../models';

@ObjectType()
export class ProductList {
  @Field()
  count: number;

  @Field(() => [Product])
  items: Product[];
}
