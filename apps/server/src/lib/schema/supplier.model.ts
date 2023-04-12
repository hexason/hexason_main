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

const SupplierSchema = SchemaFactory.createForClass(Supplier);
SupplierSchema.set('toJSON', {
  virtuals: true
});
SupplierSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
export { SupplierSchema }