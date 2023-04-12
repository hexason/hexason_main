import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Supplier {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  logo: string;

  @Prop()
  location: string;

  @Prop()
  supplierType: "premium" | "person" | "commerce"

  @Prop()
  score: 0
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier);