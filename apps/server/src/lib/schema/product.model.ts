import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Item } from './item.model';
import { Supplier } from './supplier.model';

export type ProductDocument = Product & Document;
@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  image: string;

  @Prop()
  description?: string;

  @Prop({})
  bgColor?: string;

  @Prop()
  category: string;

  @Prop()
  brand?: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number })
  oldPrice?: number;

  @Prop({ default: 0 })
  sold: number;

  @Prop({ default: 0 })
  quantity: number;

  @Prop({ enum: ['active', 'inactive', 'draft'], required: true })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'Supplier' })
  supplier: Supplier | string;

  @Prop({ type: [{ configName: String, value: String }] })
  options: { configName: string, value: string };

  @Prop({ type: [{ type: { image: String, blurHash: String } }] })
  images: { url: string, blurHash: string }[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Item' }] })
  items: Item[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
