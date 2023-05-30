import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CategoryDocument = Category & Document;

@ObjectType()
@Schema({ timestamps: true })
export class Category {
  @Field(() => ID)
  id: string;

  @Field({ defaultValue: 'unknown' })
  @Prop({ required: true, unique: true })
  title: string;

  @Field({ nullable: true })
  @Prop({ required: false })
  icon?: string;

  @Field({ nullable: true })
  @Prop({ type: String })
  description?: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: Types.ObjectId, ref: 'Category' })
  parent?: Category | Types.ObjectId;

  @Field({ nullable: true, defaultValue: 0 })
  @Prop({ type: Number, default: 0 })
  score?: number;
}

const CategorySchema = SchemaFactory.createForClass(Category);
CategorySchema.set('toJSON', {
  virtuals: true,
});
CategorySchema.virtual('id').get(function () {
  return this._id.toHexString();
});
export { CategorySchema };
