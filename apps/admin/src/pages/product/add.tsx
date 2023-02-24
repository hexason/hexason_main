import FileUploader from "@/components/FileUploader";
import FileUploaderMany from "@/components/FileUploaderMany";
import { Divider, Input, Space } from "antd";
import { useState } from "react";

export default function Home() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [images, setImages] = useState<string[]>([""]);

  return (<Space direction="vertical" size={"middle"}>
    <Input addonBefore="Нэр" />
    <Input addonBefore="Агууламж, Тайлбар" />
    <Input addonBefore="Тоо ширхэг" />
    <Input addonBefore="Зарагдах үнэ" />
    <Input addonBefore="Хуучин үнэ" />
    <Input addonBefore="Бренд" />
    <Input addonBefore="Бүтээгдэхүүний төрөл" />
    <Input addonBefore="Нийтлэх" />
    <Divider />
    <FileUploader url={imageUrl} setUrl={setImageUrl} />
    <Divider />
    <FileUploaderMany  images={images} setImages={setImages} />
  </Space>
  )
}
