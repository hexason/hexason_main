import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AddressInputQL {
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
}
