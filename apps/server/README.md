# Model adding rule

Only add to `[module]/models/<Name>.model.ts`

Must export `<Name>` and `<Name>Schema`
exampe:

```ts
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CategoryDocument = Category & Document; // X don't export anything

@ObjectType()
@Schema({ timestamps: true })
export class Category {
  // must be exported
  // models field...
}

const CategorySchema = SchemaFactory.createForClass(Category);
CategorySchema.set('toJSON', {
  virtuals: true,
});
CategorySchema.virtual('id').get(function () {
  // Need convert ObjectId to string
  return this._id.toHexString();
});

export { CategorySchema }; // Must be exported
```

then you need index it `models/index.ts`
