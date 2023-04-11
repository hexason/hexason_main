import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Item } from './item.model';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  image: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  bgColor: string;

  @Prop()
  itemType?: string;

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

  //TODO: supplier
  @Prop({ required: true })
  supplier: string;

  //TODO: options
  @Prop({ required: true })
  options: string;

  @Prop({ type: [{ type: { image: String, blurHash: String } }] })
  images: { url: string, blurHash: string }[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Item' }] })
  items: Item[];

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
