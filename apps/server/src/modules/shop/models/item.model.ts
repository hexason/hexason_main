import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { ItemI, VariationI } from 'pointes';
import { Product } from './product.model';

@Schema({ timestamps: true })
export class Item implements ItemI {
  @Prop({ unique: true, required: true })
  SKU: string; // stock keeping unit

  @Prop({ type: String })
  UPC: string; // universal product code

  @Prop({
    type: {
      configName: { type: String, required: true },
      value: { type: String, required: true },
      icon: String,
    },
  })
  variations: VariationI[];

  @Prop({ min: 0, required: true })
  price: number;

  @Prop({ min: 0, required: true })
  stock: number;

  @Prop({ default: 12 }) // 12 - active, 0 - pending
  status: number;

  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  product: Product | Types.ObjectId;
}

const ItemSchema = SchemaFactory.createForClass(Item);
ItemSchema.set('toJSON', {
  virtuals: true,
});
ItemSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

export { ItemSchema };
