import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class SearchArg {
  @Field()
  query: string;

  @Field()
  page: number;

  @Field()
  limit: number;

  @Field()
  provider?: string;
}

@ObjectType()
export class SearchProductResult {
  @Field()
  count: number;
  @Field(() => [SearchProduct])
  items: SearchProduct[];
}

@ObjectType()
export class SearchProduct {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  image: string;

  @Field()
  price: number;

  @Field()
  sold: number;

  @Field()
  discount: number;
}
