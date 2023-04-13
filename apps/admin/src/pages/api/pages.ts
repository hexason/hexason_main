import { NextRequest } from "next/server";

export default function handler(req: NextRequest, res: any) {

  const buttons = [
    {
      url: "/",
      txt: "Home",
      order: 1
    },
    {
      url: "/page/product",
      txt: "Products",
      order: 0
    },
    {
      url: "/page/integration",
      txt: "Integrations",
      order: 0
    },
  ]

  return res.status(200).send(buttons.sort((a, b) => b.order - a.order)).sort();
}