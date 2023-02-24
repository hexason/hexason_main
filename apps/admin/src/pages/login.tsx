import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Input } from 'antd';
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
  }, [user]);


  return <div>
    <Input placeholder="username" name="username" type={"text"} value={inputValue.username} onChange={handleInputValue} prefix={<FaUser />} />

    <Input placeholder="password" name="password" type={"password"} value={inputValue.password} onChange={handleInputValue} prefix={<FaUser />} />
    <Button loading={loading} onClick={handleLogin}>
      Login
    </Button>
  </div>
}