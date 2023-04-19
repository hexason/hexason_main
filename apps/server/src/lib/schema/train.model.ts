import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class TrainGpt {
  @Prop()
  botName: string;

  @Prop()
  trainContext: string;

  @Prop()
  trainData: string;
}

export const TrainGptSchema = SchemaFactory.createForClass(TrainGpt);
