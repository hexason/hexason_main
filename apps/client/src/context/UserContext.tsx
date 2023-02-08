import { useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "../lib/Store";
import LoginModal from "../components/Modals/LoginModal";

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
  total_earned: number;
  balance: number,
  isConnected: boolean,
  address: string,
}

export type Product = {
  id: string;
  title: string;
  price: number;
  sold: number;
  image: string;
  status: string;
}

export type UserContextType = {
  user: User;
  wallet: Wallet;
  products: {
    product: Product;
  }[];
  earnedDays: {
    date: string;
    value: string;
  }[];
  loading?: boolean;
  onOpen: () => void;
  refreshSession?: () => void;
  logout?: () => void;
  signIn?: () => void;
  withdrawal?: (address: string, amount: number) => Promise<any>;
}
export const UserContext = createContext<UserContextType>({
  user: {},
  onOpen: () => {},
  wallet: {
    address: "Not Connected",
    balance: 0,
    total_earned: 0,
    isConnected: false,
  },
  products: [],
  earnedDays: []
});
export default function UserContextProvider({ children }: any) {
  const [user, setUser] = useState<User>({});
  const [products, setProducts] = useState<{ product: Product }[]>([]);
  const [earnedDays, setEarnedDays] = useState<{ date: string, value: string }[]>([]);
  const [redirectTo, setRedirectTo] = useState<string>("https://cubezet.com");
  const [wallet, setWallet] = useState<Wallet>({
    balance: 0,
    address: "Not Connected",
    isConnected: false,
    total_earned: 0,
  });
  const {isOpen, onClose, onOpen} = useDisclosure()
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const refreshSession = async () => {
    supabase.auth.getUser().then(async ({ data, error }: any) => {
      if (error) throw error;
      const token = await supabase.auth.getSession()
      const userCube = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/user/init", {
        headers: {
          Authorization: `Bearer ${token.data.session?.access_token}`
        }
      });
      const status = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/user/status", {
        headers: {
          Authorization: `Bearer ${token.data.session?.access_token}`
        }
      }).then(({ data }) => data).catch(() => { });
      setUser(data.user ? data.user : {});
      setWallet(((prev) => ({
        ...prev,
        balance: userCube.data.wallet.balance,
        address: userCube.data.wallet.address,
        isConnected: true,
        total_earned: status?.totalEarning,
      })))
      setEarnedDays(status?.lastSevenDays);
      setProducts(userCube.data.products);
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      setLoading(false);
    });
  }
  const withdrawal = async (address: string, amount: number) => {
    const token = await supabase.auth.getSession()
    const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/user/withdraw", {
      address,
      amount,
    }, {
      headers: {
        Authorization: `Bearer ${token.data.session?.access_token}`
      }
    });
    return res
  }

  useEffect(() => {
    refreshSession();
    console.log(window.location.href)
    setRedirectTo(window.location.href);
  }, [router]);

  return (
    <UserContext.Provider
      value={{
        user,
        wallet,
        loading,
        products,
        onOpen,
        earnedDays: earnedDays.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
        withdrawal,
        refreshSession,
        logout: () => {
          setLoading(true);
          supabase.auth.signOut().catch(e => console.log(e)).finally(() => {
            setLoading(false);
          });
          setUser({});
        },
        signIn: () => {
          setLoading(true);
          console.log(redirectTo)
          supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
              redirectTo
            }
          }).then(({ data, error }: any) => {
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
      <LoginModal {...{isOpen, onClose}} />
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext)
