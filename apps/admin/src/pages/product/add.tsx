import FileUploader from "@/components/FileUploader";
import { useState } from "react";

export default function Home() {
  const [imageUrl, setImageUrl] = useState<string>("");

  return (
    <FileUploader url={imageUrl} setUrl={setImageUrl} />
  )
}
