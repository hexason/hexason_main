import { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "../../lib/Store";


export type User = {
  id?: string;
  aud?: string;
  role?: string;
  email?: string;
  user_metadata?: {
    avatar_url: string;
    email: string;
    email_verified: boolean;
    full_name: string;
    name: string;
    picture: string;
  }
}
export const UserContext = createContext<{user?: User, loading?:boolean}>({});
export default function UserContextProvider({ children }:any) {
  const [user, setUser] = useState<User>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error }:any) => {
      if(error) throw error;
      setUser(data.user ? data.user : {});
      setLoading(false);
    }).catch((error) => {
      console.log(error)
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const { user, loading } = useContext(UserContext);
  return { user, loading };
}