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

export type UserContextType = {
  user: User;
  loading?: boolean;
  logout?: () => void;
  signIn?: () => void;
}
export const UserContext = createContext<UserContextType>({ user: {}});
export default function UserContextProvider({ children }:any) {
  const [user, setUser] = useState<User>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error }:any) => {
      if(error) throw error;
      setUser(data.user ? data.user : {});
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        logout: () => {
          setLoading(true);
          supabase.auth.signOut().catch(e=> console.log(e)).finally(() => {
            setLoading(false);
          });
          setUser({});
        },
        signIn: () => {
          setLoading(true);
          supabase.auth.signInWithOAuth({ provider: "google" }).then(({ data, error }:any) => {
            if(error) throw error;
            setUser(data.user ? data.user : {});
          }).catch((error) => {
            console.log(error)
          }).finally(() => {
            setLoading(false);
          });
        }
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext)
