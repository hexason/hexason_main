import { useState, useEffect } from "react";
import axios, { Method } from "axios"

export const useAxios = <T>(url:string, payload:Object, method: Method) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    const accessToken = localStorage.getItem("a_token");
    axios({
      method: method,
      baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
      url,
      [(method === "get" || method==="GET") ? "params" : "data"]: payload,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
    })
      .then((response) => setData(response.data))
      .catch((error) => setError(error.message))
      .finally(() => setLoaded(true));
  }, []);

  return { data, error, loaded };
};