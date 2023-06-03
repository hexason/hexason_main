import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { ItemI } from 'pointes';
import { Product } from './product.model';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Schema({ timestamps: true })
export class Item implements ItemI {
  @Field(() => ID)
  id: string;

  @Field()
  @Prop({ unique: true, required: true })
  SKU: string; // stock keeping unit

  @Field({ nullable: true })
  @Prop({ type: String })
  UPC: string; // universal product code

  @Field(() => [Variation])
  @Prop({
    type: [
      {
        configName: { type: String, required: true },
        value: { type: String, required: true },
        icon: String,
      },
    ],
  })
  variations: Variation[];

  @Field()
  @Prop({ min: 0, required: true })
  price: number;

  @Field()
  @Prop({ min: 0, required: true })
  stock: number;

  @Field()
  @Prop({ default: 12 }) // 12 - active, 0 - pending
  status: number;

  @Field(() => Product)
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  product: Product | Types.ObjectId | unknown;
}

@ObjectType()
export class Variation {
  @Field()
  configName: string;

  @Field()
  value: string;

  @Field({ nullable: true })
  icon: string;
}
const ItemSchema = SchemaFactory.createForClass(Item);
ItemSchema.set('toJSON', {
  virtuals: true,
});
ItemSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

export { ItemSchema };
