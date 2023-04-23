import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Supplier } from './supplier.model';
import { ProductI } from 'pointes';

export type ProductDocument = Product & Document;
@Schema({ timestamps: true })
export class Product implements ProductI {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  image: string;

  @Prop()
  description?: string;

  @Prop({})
  bgColor?: string;

  @Prop({ type: [Types.ObjectId], ref: 'Category', required: true })
  category: any[];

  @Prop({ default: 'unknown' })
  brand?: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number, default: 0 })
  discount?: number;

  @Prop({ default: 0 })
  sold: number;

  @Prop({ default: 0 })
  quantity: number;

  @Prop({ default: 12, required: true })
  status: number; // 12 - active, 1 - cancel, 0 - pending

  @Prop({ type: Types.ObjectId, ref: 'Supplier', required: true })
  supplier: Supplier | string;

  @Prop({ type: [{ configName: String, value: String }] })
  options: { configName: string; value: string }[];

  @Prop({ type: [{ type: { url: String, blurHash: String } }] })
  images: { url: string; blurHash: string }[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Item' }] })
  items: any[];
}

const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.set('toJSON', {
  virtuals: true,
});
ProductSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

export { ProductSchema };
