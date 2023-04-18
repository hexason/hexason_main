import { EXPLAIN_TO_GPT } from '@/lib/data/train';
import { GoogleService } from '@/service';
import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';

const sessions: any = {};
@Controller('ai')
export class AiCcontroller {
  recomdation: any = [];
  ask: any;
  constructor(private readonly googleService: GoogleService) {
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
    const translation = await this.googleService.translate(
      text,
      target,
      source,
    );
    return translation[0].translatedText;
  }

  @Post('chat/ask')
  async chatAsk(@Body() { session, message, translate }: any) {
    if (!session) throw new HttpException({ message: 'session required' }, 400);
    if (!sessions[session]) {
      sessions[session] = [
        {
          role: 'system',
          content: "You're response must me html formatted.",
        },
        {
          role: 'system',
          content: EXPLAIN_TO_GPT,
        },
      ];
    }

    let en = { role: 'user', content: message };
    if (translate) {
      const { translations } = await this.googleService.translate(
        message,
        'en',
      );
      en = { role: 'user', content: translations[0].translatedText };
    }

    sessions[session].push(en);
    const answer = await this.ask(sessions[session]);
    sessions[session].push({
      role: 'assistant',
      content: answer.data.choices[0].message?.content,
    });

    return sessions[session].filter((e: any) => e.role != 'system');
  }

  @Post('chat/init')
  async initChat(@Body() { session }: any) {
    return sessions[session].filter((e: any) => e.role != 'system');
  }
}
