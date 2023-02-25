import FileUploader from "@/components/FileUploader";
import FileUploaderMany from "@/components/FileUploaderMany";
import { Button, Divider, Input, Space } from "antd";
import { useState } from "react";

export default function Home() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [images, setImages] = useState<string[]>([""]);
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    quantity: "",
    price: "",
    oldPrice: "",
    brand: "",
    type: "",
    status: "active",
  })

  const handleSubmit = () => {
    console.log(inputs, imageUrl, images)
  }

  const handleInputChange = (e: any) => {
    let value = e.target.value
    let key = e.target.name as keyof typeof inputs;
    switch (key) {
      case "price":
        value = value.replace(/[^0-9]/g, '').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        break;
      case "oldPrice":
        value = value.replace(/[^0-9]/g, '').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        break;
    }
    setInputs({
      ...inputs,
      [key]: value
    })
  }

  return (<Space direction="vertical" size={"middle"}>
    <Input onChange={handleInputChange} type="text" value={inputs.title} name="title" placeholder="Нэр" />
    <Input onChange={handleInputChange} type="text" value={inputs.description} name="description" placeholder="Агууламж, Тайлбар" />
    <Input onChange={handleInputChange} type="text" value={inputs.quantity} name="quantity" placeholder="Тоо ширхэг" />
    <Input onChange={handleInputChange} type="text" value={inputs.price} name="price" placeholder="Зарагдах үнэ" />
    <Input onChange={handleInputChange} type="text" value={inputs.oldPrice} name="oldPrice" placeholder="Хуучин үнэ" />
    <Input onChange={handleInputChange} type="text" value={inputs.brand} name="brand" placeholder="Бренд" />
    <Input onChange={handleInputChange} type="text" value={inputs.type} name="type" placeholder="Бүтээгдэхүүний төрөл" />
    <Input onChange={handleInputChange} type="text" value={inputs.status} name="status" placeholder="Нийтлэх" />
    <Divider />
    <FileUploader url={imageUrl} setUrl={setImageUrl} />
    <Divider />
    <FileUploaderMany images={images} setImages={setImages} />
    <Button type="primary" onClick={handleSubmit}>Нэмэх</Button>
  </Space>
  )
}
