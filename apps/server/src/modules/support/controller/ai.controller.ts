import { Chat, TrainGpt } from '../models';
import { GoogleService } from '../services';
import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';

const sessions: any = {};
@Controller('ai')
export class AiCcontroller {
  recomdation: any = [];
  ask: any;
  constructor(
    private readonly googleService: GoogleService,
    @InjectModel(Chat.name) private readonly chatSchem: Model<Chat>,
    @InjectModel(TrainGpt.name) private readonly trainSchem: Model<TrainGpt>,
  ) {
    const config = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(config);
    this.ask = async (messages: ChatCompletionRequestMessage[]) => {
      const completion = await openai
        .createChatCompletion({
          model: 'gpt-3.5-turbo',
          messages,
        })
        .catch((e) => {
          console.log(JSON.stringify(e.response.data));
          throw e;
        });

      return completion;
    };
  }

  @Post('google/translate')
  async googleTranslate(@Body() { text, source, target }: any) {
    const { translations } = await this.googleService.translate(text, target, source);
    if (translations) return translations[0];
  }

  @Post('chat/ask')
  async chatAsk(@Body() { session, message, translate }: any) {
    if (!session) throw new HttpException({ message: 'session required' }, 400);
    if (!sessions[session]) {
      const traindata = (await this.trainSchem.find({})).map((e) => ({
        role: 'system',
        content: e.trainContext,
      }));
      sessions[session] = traindata;
    }

    let en = { role: 'user', content: message };
    if (translate) {
      const { translations } = await this.googleService.translate(message, 'en');
      en = { role: 'user', content: translations && translations[0].translatedText };
    }
    sessions[session].push(en);
    const answer = await this.ask(sessions[session]);
    sessions[session].push({
      role: 'assistant',
      content: answer.data.choices[0].message?.content,
    });

    const newChats = [
      new this.chatSchem({
        session,
        ...en,
      }),
      new this.chatSchem({
        role: 'assistant',
        session,
        content: answer.data.choices[0].message?.content,
      }),
    ];
    this.chatSchem.insertMany(newChats).catch((e) => {
      console.log(e);
    });

    return sessions[session].filter((e: any) => e.role != 'system');
  }

  @Post('chat/init')
  async initChat(@Body() { session }: any) {
    return sessions[session].filter((e: any) => e.role != 'system');
  }
}
