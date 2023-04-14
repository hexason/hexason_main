import { ABOUT_BEATHOSTEL, EXPLAIN_TO_GPT } from "@/lib/data/train";
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
    const axios = require("axios");

    const options = {
      method: 'GET',
      url: 'https://booking-com.p.rapidapi.com/v1/hotels/room-list',
      params: {
        hotel_id: '495712',
        currency: 'SGD',
        checkout_date: '2023-04-20',
        locale: 'en-gb',
        checkin_date: '2023-04-15',
        adults_number_by_rooms: '1',
        units: 'metric'
      },
      headers: {
        'X-RapidAPI-Key': '27902383ccmsh73734c1b4b05958p1f703cjsne31eda711108',
        'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
      }
    };

    axios.request(options).then((response)  => {
      this.recomdation = JSON.stringify(response.data);
    }).catch(function (error) {
      console.error(error);
    });
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
        {
          "role": "system", "content": ABOUT_BEATHOSTEL,
        },
        {
          "role": "system", "content": "Greetings friendly no additional requirement needed. Just introduce yourself Hexy.",
        },
        {
          "role": "system", "content": `If request booking form or wanted booking include your answer this '{{book_number}}'. Then your response rendered by ejs. 
        You need to give this after booking confirmation:<iframe src="https://docs.google.com/forms/d/e/1FAIpQLScdsobukoR6q_fseyPU6w3pUcsfDtrdvm1H3fhGMthyKn00eQ/viewform?embedded=true" width="640" height="801" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe> `
        },
      ];
      if (this.recomdation) sessions[session].push({
        "role": "system", "content": "this room recomdation json " + this.recomdation
      })
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