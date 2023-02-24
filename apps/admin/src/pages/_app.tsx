import LayoutBuilder from '@/components/LayoutBuilder';
import { AuthContext } from '@/context/AuthContext'
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { User, useUser } from '@/hooks/useUser';
import '@/styles/globals.css'
import axios from 'axios';
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User | null>(null);
  const { getItem } = useLocalStorage();
  const { removeUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    const localUser = getItem('user');
    if (localUser) {
      axios({
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
      });
    } else router.replace("/login")
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {user ? <LayoutBuilder>
        <Component {...pageProps} />
      </LayoutBuilder> :
        <Component {...pageProps} />
      }
    </AuthContext.Provider>
  )
}
