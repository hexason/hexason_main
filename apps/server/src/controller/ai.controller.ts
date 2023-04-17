import { EXPLAIN_TO_GPT } from "@/lib/data/train";
import { Body, Controller, HttpException, Post, Query } from "@nestjs/common";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai"

let sessions: any = {}
@Controller("ai")
export class AiCcontroller {
  recomdation: any = []
  ask: any;
  constructor() {
    const config = new Configuration({
      apiKey: process.env.OPENAI_API_KEY
    });
    const openai = new OpenAIApi(config);
    this.ask = async (messages: ChatCompletionRequestMessage[]) => {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages
      }).catch(e => {
        console.log(JSON.stringify(e.response.data))
        throw e
      });

      return completion
    }
  }

  @Post("chat/ask")
  async chatAsk(@Body() { session, message }: any, @Query() { provider }: any) {
    if (!session) throw new HttpException({ message: "session required" }, 400);
    if (!sessions[session]) {
      sessions[session] = [
        {
          "role": "system", "content": "You're response must me html formatted.",
        },
        {
          "role": "system", "content": EXPLAIN_TO_GPT,
        },
      ];
    }
    const en = { role: "user", content: message }
    sessions[session].push(en)
    const answer = await this.ask(sessions[session]);
    sessions[session].push({ role: "assistant", content: answer.data.choices[0].message?.content })

    return sessions[session].filter((e: any) => e.role != "system")
  }

  @Post("chat/init")
  async initChat(@Body() { session }: any) {
    return sessions[session].filter((e: any) => e.role != "system");
  }
}