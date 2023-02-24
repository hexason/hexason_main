import { useEffect, useState } from 'react';
import { useUser, User } from './useUser';
import { useLocalStorage } from './useLocalStorage';
import axios from 'axios';

export const useAuth = () => {
  const { user, addUser, removeUser } = useUser();
  const { getItem } = useLocalStorage();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const user = getItem('user');
    if (user) {
      addUser(JSON.parse(user));
    }
  }, []);

  const login = async (username: string, password: string) => {
    setLoading(true);
    await axios({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      url: "/admin/login",
      method: "post",
      data: {
        username,
        password
      }
    }).then((response) => {
      addUser(response.data as User);
    }).catch((e) => {
      console.log(e)
    });
    setLoading(false);
  };

  const logout = () => {
    removeUser();
  };

  return { user, login, logout, loading };
};