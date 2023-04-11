import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Supplier {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  location: string;

  @Prop()
  review: string;
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier);