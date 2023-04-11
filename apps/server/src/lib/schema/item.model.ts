import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema({timestamps: true})
export class Item {
  @Prop()
  altTxt: string;

  @Prop()
  image: string;

  @Prop()
  sku: string; // stock keeping unit

  @Prop()
  upc: string; // universal product code

  @Prop()
  price: string;

  @Prop()
  stock: number;

  @Prop({ref: 'Product'})
  product: string;
}

export const ItemSchema = SchemaFactory.createForClass(Item);