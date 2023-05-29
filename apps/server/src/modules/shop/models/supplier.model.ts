
import { ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProductDocument = Supplier & Document;
@ObjectType({ description: 'supplier' })
@Schema({ timestamps: true })
export class Supplier {
  @Field(() => ID)
  id: string;

  @Field()
  @Prop({ required: true, unique: true })
  name: string;

  @Field()
  @Prop({ required: true })
  description: string;

  @Field()
  @Prop()
  logo: string;

  @Field()
  @Prop()
  location: string;

  @Field()
  @Prop()
  supplierType: 'premium' | 'person' | 'commerce';

  @Field()
  @Prop()
  score: 0;
}

const SupplierSchema = SchemaFactory.createForClass(Supplier);
SupplierSchema.set('toJSON', {
  virtuals: true,
});
SupplierSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
export { SupplierSchema };
