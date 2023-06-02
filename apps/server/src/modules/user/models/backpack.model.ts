import { Product } from '@/modules/shop/models';
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
  basket: {
    info: Product | Types.ObjectId | string;
    quantity: number;
    price: number;
    totalPrice: number;
  }[];

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
export { BackpackSchema };
