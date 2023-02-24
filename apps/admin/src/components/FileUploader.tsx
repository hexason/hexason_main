import { message, Upload } from 'antd';
import { RcFile } from 'antd/es/upload';
import { useState } from 'react'
import { FaCircle, FaPlus } from 'react-icons/fa';

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};
const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 20;
  if (!isLt2M) {
    message.error('Image must smaller than 20MB!');
  }
  return isJpgOrPng && isLt2M;
};
export type FileUploadProps = {
  url: string,
  setUrl: (url:string) => void
}
export default function FileUploader({url, setUrl}:FileUploadProps) {
  const [loading, setLoading] = useState(false);

  const handleUploadClick = async (file: RcFile) => {
    if (!file) {
      return "error";
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('image', file);
    return await fetch('https://api.imgbb.com/1/upload?key=b96681fa75ea775b33dc015c1a45ad81', {
      method: 'POST',
      body: formData,
    }).then((res) => res.json())
      .then(async (data) => {
        return await new Promise<string>((resolve) => getBase64(file, (url) => {
          setLoading(false);
          setUrl(data.data.url);
          resolve(url);
        }));
      })
      .catch((err) => {
        message.error(err.message)
        return err.message
      });
  };

  const uploadButton = (
    <div>
      {loading ? <FaCircle /> : <FaPlus />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action={handleUploadClick}
      beforeUpload={beforeUpload}
      disabled={loading}
    >
      {url ? <img src={url} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
    </Upload>
  )
}