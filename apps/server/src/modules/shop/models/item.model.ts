import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { ItemI } from 'pointes';
import { Product } from './product.model';

@Schema({ timestamps: true })
export class Item implements ItemI {
  @Prop({ required: true })
  configName: string;

  @Prop({ required: true })
  altTxt: string;

  @Prop()
  image: string;

  @Prop({ unique: true, required: true })
  sku: string; // stock keeping unit

  @Prop()
  upc: string; // universal product code

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  stock: number;

  @Prop({ default: 12 }) // 1 - active, 0 - pending
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
