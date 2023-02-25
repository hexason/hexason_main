import FileUploader from "@/components/FileUploader";
import FileUploaderMany from "@/components/FileUploaderMany";
import { useAuth } from "@/hooks/useAuth";
import { Button, Divider, Input, message, Select, Space } from "antd";
import axios from "axios";
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
  })
  const [status, setStatus] = useState("active")
  const { user } = useAuth();

  const handleSubmit = () => {
    const result = {
      "title": inputs.title,
      "description": inputs.description,
      "brand": inputs.brand,
      "itemType": inputs.type,
      "image": imageUrl,
      "price": +inputs.price.replaceAll(",", ""),
      "oldPrice": +inputs.oldPrice.replaceAll(",", ""),
      "quantity": +inputs.quantity,
      "status": status,
      "images": images.filter((url) => url)
    }
    axios({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      url: "product/create",
      data: result,
      method: "post",
      headers: {
        Authorization: "Bearer " + user?.access_token
      }
    }).then(() => {
      message.success("success")
    }).catch((e) => message.error(e.message))
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
  const handleSelectChange = (value: string) => {
    setStatus(value);
  }

  return (<Space direction="vertical" size={"middle"}>
    <Input onChange={handleInputChange} type="text" value={inputs.title} name="title" placeholder="Нэр" />
    <Input onChange={handleInputChange} type="text" value={inputs.description} name="description" placeholder="Агууламж, Тайлбар" />
    <Input onChange={handleInputChange} type="text" value={inputs.quantity} name="quantity" placeholder="Тоо ширхэг" />
    <Input onChange={handleInputChange} type="text" value={inputs.price} name="price" placeholder="Зарагдах үнэ" />
    <Input onChange={handleInputChange} type="text" value={inputs.oldPrice} name="oldPrice" placeholder="Хуучин үнэ" />
    <Input onChange={handleInputChange} type="text" value={inputs.brand} name="brand" placeholder="Бренд" />
    <Input onChange={handleInputChange} type="text" value={inputs.type} name="type" placeholder="Бүтээгдэхүүний төрөл" />
    <Select
      defaultValue={status}
      onChange={handleSelectChange}
      style={{ width: 120 }}
      options={[
        { value: 'active', label: 'Идэвхитэй' },
        { value: 'draft', label: 'Хадгалах' },
        { value: 'inactive', label: 'Идэвхигүй' },
      ]} />
    <Divider />
    <FileUploader url={imageUrl} setUrl={setImageUrl} />
    <Divider />
    <FileUploaderMany images={images} setImages={setImages} />
    <Button type="primary" onClick={handleSubmit}>Нэмэх</Button>
  </Space>
  )
}
