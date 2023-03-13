import LayoutBuilder from '@/components/LayoutBuilder';
import { AuthContext } from '@/context/AuthContext'
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { User, useUser } from '@/hooks/useUser';
import '@/styles/globals.css'
import axios from 'axios';
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Login from './login';
import NextNProgress from "nextjs-progressbar"


export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User | null>(null);
  const { getItem } = useLocalStorage();
  const { removeUser } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const userRefresh = async () => {
    setLoading(true);
    const localUser = getItem('user');
    if (localUser) {
      await axios({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        method: "get",
        url: "admin/me",
        headers: {
          authorization: "Bearer " + JSON.parse(localUser).access_token
        }
      }).then(response => {
        setUser(response.data)
      }).catch(async () => {
        await axios({
          baseURL: process.env.NEXT_PUBLIC_API_URL,
          method: "post",
          url: "admin/refresh",
          data: {
            refresh_token: JSON.parse(localUser).refresh_token
          }
        }).then(response => {
          setUser(response.data)
        }).catch(() => removeUser())
      })
    } else await router.replace("/login")
    setLoading(false)
  }
  useEffect(() => {
    userRefresh();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NextNProgress />
      {loading ? "Loading..." :
        user ?
          <LayoutBuilder>
            <Component {...pageProps} />
          </LayoutBuilder> : <Login />
      }
    </AuthContext.Provider>
  )
}
