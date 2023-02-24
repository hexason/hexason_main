import { Button, Space } from "antd"
import { Dispatch, SetStateAction } from "react"
import FileUploader from "./FileUploader"

export type FileUploadManyProps = {
  images: string[],
  setImages: Dispatch<SetStateAction<string[]>>
}
export default function FileUploaderMany({ images, setImages }: FileUploadManyProps) {
  const addImage = () => {
    setImages(prev => [...prev, ""])
  }
  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }
  const setUrl = (url: string, index: number) => {
    setImages(images.map((el: string, i) => {
      if (i === index) return url;
      else return el;
    }))
  }

  return (
    <>
      <Button onClick={addImage}>Add Image</Button>
      <Space direction="horizontal">
        {images.map((el, i) => <div>
          <FileUploader url={el} setUrl={(url: string) => setUrl(url, i)} />
          <Button onClick={() => (removeImage(i))}>Remove Image</Button>
        </div>)}
      </Space>
    </>
  )
}
