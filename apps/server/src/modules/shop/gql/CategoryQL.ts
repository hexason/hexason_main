import { Types } from 'mongoose';
import { Category } from '../models';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CategoryTree implements Partial<Category> {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  icon?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [CategoryTree], { defaultValue: [] })
  children: CategoryTree[];

  @Field({ defaultValue: 0 })
  score?: number;

  parent?: Category | Types.ObjectId | undefined;
}
