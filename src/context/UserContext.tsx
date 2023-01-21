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
export type Wallet = {
  id?: string;
  investor_card: number;
  total_earned: number;
  balance: number,
  isConnected: boolean
}

export type UserContextType = {
  user: User;
  wallet: Wallet
  loading?: boolean;
  logout?: () => void;
  signIn?: () => void;
}
export const UserContext = createContext<UserContextType>({
  user: {}, wallet: {
    balance: 0,
    total_earned: 0,
    isConnected: false,
    investor_card: 0
  }
});
export default function UserContextProvider({ children }: any) {
  const [user, setUser] = useState<User>({});
  const [wallet, setWallet] = useState<Wallet>({
    balance: 0,
    isConnected: false,
    total_earned: 0,
    investor_card: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error }: any) => {
      if (error) throw error;
      setUser(data.user ? data.user : {});
      setWallet({
        balance: 0,
        isConnected: false,
        total_earned: 0,
        investor_card: 0
      })
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
        wallet,
        loading,
        logout: () => {
          setLoading(true);
          supabase.auth.signOut().catch(e => console.log(e)).finally(() => {
            setLoading(false);
          });
          setUser({});
        },
        signIn: () => {
          setLoading(true);
          supabase.auth.signInWithOAuth({ provider: "google" }).then(({ data, error }: any) => {
            if (error) throw error;
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
