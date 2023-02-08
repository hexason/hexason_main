import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios"

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  axios({
    method: "get",
    url: "https://cubezet-hfnf.vercel.app/product",
  }).then(({data}) => res.send(data)).catch(e => res.status(500).json({ error: e.message }))

}