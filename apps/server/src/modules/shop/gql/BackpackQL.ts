import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BackpackBasketProductAdd {
  @Field()
  productId: string;

  @Field()
  quantity: number;
}

@InputType()
export class BackpackFavoriteProductUpdate {
  @Field(() => [String])
  ids: string[];
}
