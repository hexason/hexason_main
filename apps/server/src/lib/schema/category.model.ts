import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: Types.ObjectId, ref: 'Category' })
  children: (Category | Types.ObjectId)[];

  @Prop({ type: Types.ObjectId, ref: 'Category' })
  parent?: Category | Types.ObjectId;

  @Prop({ type: Number, default: 0 })
  order?: number;
}

const CategorySchema = SchemaFactory.createForClass(Category);
CategorySchema.set('toJSON', {
  virtuals: true,
});
CategorySchema.virtual('id').get(function () {
  return this._id.toHexString();
});
export { CategorySchema };
