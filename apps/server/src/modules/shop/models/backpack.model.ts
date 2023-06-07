import { Product } from '@/modules/shop/models';
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Backpack {
  @Prop()
  userId: string;

  @Prop({
    type: [
      {
        info: {
          type: Types.ObjectId,
          ref: 'Product',
        },
        quantity: Number,
        price: Number,
        totalPrice: Number,
      },
    ],
  })
  basket: Basket[];

  @Prop({ type: [Types.ObjectId], ref: 'Product' })
  favorite: Product[];
}

const BackpackSchema = SchemaFactory.createForClass(Backpack);
BackpackSchema.set('toJSON', {
  virtuals: true,
});
BackpackSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

@ObjectType()
export class Basket {
  @Field(() => Product)
  info: Product | Types.ObjectId | string;

  @Field()
  quantity: number;

  @Field()
  price: number;

  @Field()
  totalPrice: number;
}
export { BackpackSchema };
