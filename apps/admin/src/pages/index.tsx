import FileUploader from "@/components/FileUploader";
import { useAuth } from "@/hooks/useAuth";
import { Button, Input, message, Space } from "antd";
import axios from "axios";
import { useEffect, useState } from "react"

export default function Home() {
  const [bank, setBank] = useState({
    "bank.name": "",
    "bank.account": "",
    "bank.reciver": ""
  });
  const [logo, setLogo] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth()
  useEffect(() => {
    axios({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      url: "/info/bank",
      method: "get"
    }).then((response) => {
      setBank(response.data)
    }).catch(() => message.error("something_went_wrong"))
  }, []);

  const inputHandler = (e: any) => {
    setBank({
      ...bank,
      [e.target.name]: e.target.value
    })
  }

  const saveHandle = async () => {
    setLoading(true);
    await axios({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      method: "post",
      url: "/config/update/bank",
      headers: {
        Authorization: "Bearer " + user?.access_token
      },
      data: bank
    }).then(() => {
      message.success("Засагдсан")
    }).catch(() => message.error("Алдаа гарлаа"))
    setLoading(false);
  }
  return (
    <Space direction="vertical">
      <FileUploader url={logo} setUrl={setLogo} />
      <Input onChange={inputHandler} addonBefore="Банк: " name="bank.name" value={bank["bank.name"]} />
      <Input onChange={inputHandler} addonBefore="Төлбөр хүлээн авах данс:" name="bank.account" value={bank["bank.account"]} />
      <Input onChange={inputHandler} addonBefore="Данс эзэмшигч:" name="bank.reciver" value={bank["bank.reciver"]} />

      <Button loading={loading} type="primary" onClick={saveHandle}>Хадгалах</Button>
    </Space>
  )
}
