import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Chat {
  @Prop()
  role: string;

  @Prop()
  content: string;

  @Prop()
  session: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
