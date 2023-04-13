import { useAuth } from "@/context/AuthContext"
import axios from "axios"
import { useRouter } from "next/router";
import { useEffect } from "react";

export const useAxios = () => {
  const { session } = useAuth();
  const router = useRouter()
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
  axios.interceptors.response.use((response) => response, (error) => {
    if (error.response && error.response.status === 401) {
      return router.replace("/no_permission");
    }
    throw error;
  });
  useEffect(() => {
    if (session) axios.defaults.headers["authorization"] = "Bearer " + session.access_token
  }, [session]);

  return axios;
}