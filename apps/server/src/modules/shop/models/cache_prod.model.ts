import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class CacheProd {
  @Prop()
  integrateId: string;

  @Prop({ index: 'text' })
  title: string;

  @Prop()
  image: string;

  @Prop()
  price: number;

  @Prop()
  sold: number;

  @Prop()
  discount: number;

  @Prop({ index: 'text' })
  slug: string;
}

export const CacheProdSchema = SchemaFactory.createForClass(CacheProd);
