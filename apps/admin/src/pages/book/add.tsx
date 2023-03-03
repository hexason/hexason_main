import FileUploader from "@/components/FileUploader";
import FileUploaderMany from "@/components/FileUploaderMany";
import { Button, Divider, Input, message, Space } from "antd";
import axios from "axios";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react"
import 'react-quill/dist/quill.snow.css';

export default function BookAdd() {
  const [title, setTitle] = useState('');
  const [context, setContext] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [images, setImages] = useState<string[]>([""]);
  const [loading, setLoading] = useState(false);
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), [])

  const saveHandle = () => {
    setLoading(true);
    axios({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      method: "post",
      url: "/book/create",
      data: {
        title,
        context,
        coverImage,
        images
      }
    }).then(() => message.success("Амжилттай")).catch(e => message.error(e.message)).finally(() => setLoading(false));
  }

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="title" />
      <div>
        <ReactQuill value={context} onChange={setContext} style={{ height: "300px", marginBottom: "20px" }} />
      </div>
      <Divider />
      <FileUploader url={coverImage} setUrl={setCoverImage} />
      <FileUploaderMany images={images} setImages={setImages} />
      <Button loading={loading} onClick={saveHandle} type="primary">Save</Button>
    </Space>
  )
}