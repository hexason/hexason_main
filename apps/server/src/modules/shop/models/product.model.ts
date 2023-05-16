import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Supplier } from './supplier.model';
import { ProductI } from 'pointes';
import { Field, ID, ObjectType } from '@nestjs/graphql';

export type ProductDocument = Product & Document;
@ObjectType({ description: 'product' })
@Schema({ timestamps: true })
export class Product implements ProductI {
  @Field(() => ID)
  @Prop({ required: true })
  title: string;

  @Field()
  @Prop({ required: true })
  image: string;

  @Field({ nullable: true })
  @Prop()
  description?: string;

  @Field({ nullable: true })
  @Prop({})
  bgColor?: string;

  @Prop({ type: [Types.ObjectId], ref: 'Category', required: true })
  categories: any[];

  @Field({ nullable: true })
  @Prop({ default: 'unknown' })
  brand?: string;

  @Field({ nullable: true })
  @Prop({ type: Number, required: true })
  price: number;

  @Field({ nullable: true })
  @Prop({ type: Number, default: 0 })
  discount?: number;

  @Field({ nullable: true })
  @Prop({ default: 0 })
  sold: number;

  @Field({ nullable: true })
  @Prop({ default: 0 })
  quantity: number;

  @Field({ nullable: true })
  @Prop({ default: 12, required: true })
  status: number; // 12 - active, 1 - cancel, 0 - pending

  @Prop({ type: Types.ObjectId, ref: 'Supplier', required: true })
  supplier: Supplier | string;

  @Field(() => [ProductImages])
  @Prop({ type: [{ type: { url: String, blurHash: String } }] })
  images: { url: string; blurHash: string }[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Item' }] })
  items: any[];
}
@ObjectType()
class ProductImages {
  @Field()
  url: string;

  @Field()
  blurHash: string;
}

const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.set('toJSON', {
  virtuals: true,
});
ProductSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

export { ProductSchema };
