import { Global, Module } from '@nestjs/common';
import { AiCcontroller } from './controller/ai.controller';
import { GoogleService, OpenAIService } from './services';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema, TrainGpt, TrainGptSchema } from './models';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chat.name, schema: ChatSchema },
      { name: TrainGpt.name, schema: TrainGptSchema },
    ]),
  ],
  providers: [GoogleService, OpenAIService],
  controllers: [AiCcontroller],
  exports: [GoogleService],
})
export class SupportModule {}
