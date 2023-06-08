import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Variation {
  @Field()
  configId: string;

  @Field()
  valueId: string;

  @Field()
  configName: string;

  @Field()
  value: string;

  @Field({ nullable: true })
  icon: string;

  @Field({ nullable: true })
  mainImage: string;

  getSchema() {
    return {
      configId: { type: String, required: true },
      valueId: { type: String, required: true },
      configName: { type: String, required: true },
      value: { type: String, required: true },
      icon: String,
      mainImage: String,
    };
  }
}
