import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Col, Input, Row, Space } from 'antd';
import { FaUser } from "react-icons/fa";

export default function Login() {
  const { user, login, loading } = useAuth();
  const [inputValue, setInputValue] = useState({
    username: "",
    password: ""
  });
  const router = useRouter()

  const handleInputValue = (e: any) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = () => {
    login(inputValue.username, inputValue.password);
  }

  useEffect(() => {
    if (user) router.replace("/")
  }, [user, router]);


  return (
    <Row className="login-page" justify="center" align={"middle"}>
      <Col>
        <Space direction="vertical" align="center">
          <div>Login</div>
 
          <Input placeholder="username" name="username" type={"text"} value={inputValue.username} onChange={handleInputValue} prefix={<FaUser />} />

          <Input placeholder="password" name="password" type={"password"} value={inputValue.password} onChange={handleInputValue} prefix={<FaUser />} />
          <Button loading={loading} onClick={handleLogin}>
            Нэвтрэх
          </Button>
        </Space>
      </Col>
    </Row>
  )
}