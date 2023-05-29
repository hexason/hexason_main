import axios from "axios"
import { useEffect } from "react";
import { useSession } from "@/lib/supabase-react"

export const useAxios = () => {
  const session = useSession();
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
  axios.interceptors.response.use((response) => response, (error) => {
    if (error.response && error.response.status === 401) {
      throw { ...error, isPermission: true };
    }
    throw error;
  });
  useEffect(() => {
    if (session) axios.defaults.headers["authorization"] = "Bearer " + session.access_token
  }, [session]);

  return axios;
}