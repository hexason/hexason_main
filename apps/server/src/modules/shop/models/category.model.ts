import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CategoryDocument = Category & Document;

@ObjectType()
@Schema({ timestamps: true })
export class Category {
  @Field(() => ID)
  id: string;

  @Field()
  @Prop({ required: true, unique: true })
  name: string;

  @Field()
  @Prop({ type: String })
  description?: string;

  @Field(() => Category)
  @Prop({ type: Types.ObjectId, ref: 'Category' })
  parent?: Category | Types.ObjectId;

  @Field()
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
