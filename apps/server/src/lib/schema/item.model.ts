import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Types } from "mongoose";

@Schema({ timestamps: true })
export class Item {
  @Prop({ required: true })
  altTxt: string;

  @Prop()
  image: string;

  @Prop({ required: true })
  sku: string; // stock keeping unit

  @Prop()
  upc: string; // universal product code

  @Prop({ required: true })
  price: string;

  @Prop({ required: true })
  stock: number;

  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  product: string;
}

const ItemSchema = SchemaFactory.createForClass(Item);
ItemSchema.set('toJSON', {
  virtuals: true
});
ItemSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

export { ItemSchema }