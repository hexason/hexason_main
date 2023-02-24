import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
    if(user) router.replace("/")
  }, [user]);


  return <div>
    <input name="username" value={inputValue.username} onChange={handleInputValue} />
    <input name="password" value={inputValue.password} onChange={handleInputValue} />
    <button disabled={loading} onClick={handleLogin}>
      Login
    </button>
  </div>
}