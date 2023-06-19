import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BackpackBasketProductAdd {
  @Field()
  productId: string;

  @Field()
  quantity: number;
}
