import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class OrderCreateArgument {
  @Field()
  username: string;

  @Field()
  address_city: string;

  @Field()
  address_district: string;

  @Field()
  address_street: string;

  @Field()
  address_info: string;

  @Field()
  contact_phone: string;

  @Field()
  contact_email: string;

  @Field({ nullable: true })
  additional_info?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [ItemOrderCreate])
  items: ItemOrderCreate[];
}

@InputType()
export class ItemOrderCreate {
  @Field()
  SKU: string;

  @Field()
  quantity: number;
}
