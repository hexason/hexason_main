import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product } from './product.model';

export type ProductViewDocument = ProductView & Document;
@Schema({ timestamps: true })
export class ProductView {
  @Prop({ type: Types.ObjectId, ref: 'Product' })
  product: Product | Types.ObjectId | string;

  @Prop()
  userId: string;
}

const ProductViewSchema = SchemaFactory.createForClass(ProductView);
ProductViewSchema.set('toJSON', {
  virtuals: true,
});
ProductViewSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

export { ProductViewSchema };
