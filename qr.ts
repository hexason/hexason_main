// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import QrCodeJS from "qrcode";
import { canvas } from "canvas";

const imgList = ["earth", "leaf"];

export default async function handler(req: any, res: any) {
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  if (req.method === "POST") {
    const { data, shape, pathColor, logoUrl } = req.body;
    if (!data) {
      res.status(400).json({ message: "Please provide data pls!", code: 4000 });
    }
    const qr = await QrPainterNode({
      data,
      shape: shape || "square1",
      pathColor,
      logoUrl,
    });
    res.status(200);
    res.setHeader("Content-Type", "image/jpg");
    res.send(qr);
  } else {
    res.status(404);
    res.end();
  }
}
