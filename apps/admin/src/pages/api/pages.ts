import { readdirSync } from "fs";
import { NextRequest } from "next/server";

export default function handler(req: NextRequest, res: any) {
  const dirList = readdirSync(__dirname + "/../page");

  const buttons = dirList.map(page => {
    const represnted = page.replace(/\.ts$|\.js$/g, "");
    return { url: "/page/" + represnted, txt: represnted, order: 0 }
  })
  buttons.push({
    url: "/",
    txt: "Home",
    order: 1
  })

  return res.status(200).send(buttons.sort((a, b) => b.order - a.order)).sort();
}