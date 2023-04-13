// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { EXPLAIN_TO_GPT } from '@/lib/data/train';
import type { NextApiRequest, NextApiResponse } from 'next'
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai"

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(config);
const ask = async (messages: ChatCompletionRequestMessage[]) => {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages
  }).catch(e => {
    console.log(JSON.stringify(e.response.data))
    throw e
  });

  return completion
}

let sessions: any = {}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = req.body.session;
  if (!session) res.status(400).json({ message: "session required" })
  if (!sessions[session]) sessions[session] = [
    {
      "role": "system", "content": EXPLAIN_TO_GPT,
    }
  ];

  if (req.query.init) return res.status(200).json(sessions[session].filter((e: any) => e.role != "system"))
  const en = { role: "user", content: req.body.message }
  sessions[session].push(en)
  const answer = await ask(sessions[session]);

  sessions[session].push({ role: "assistant", content: answer.data.choices[0].message?.content })

  res.status(200).json(sessions[session].filter((e: any) => e.role != "system"))
}
