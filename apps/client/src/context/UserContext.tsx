import { useRouter } from "next/router";
import { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "../lib/Store";
import LoginModal from "../components/modals/LoginModal";
import { UserContextType } from "../interface/user";
import { User } from "@supabase/supabase-js";
import { useModal } from "./ModalContext";
import ShopBasketDrawer from "../components/other/ShopBasketDrawer";
import { useDisclosure } from "@chakra-ui/react";
import { Product } from "../interface/product";

export const UserContext = createContext<UserContextType>({ loading: true, basket: [] });
export default function UserContextProvider({ children }: any) {
  const [user, setUser] = useState<User | undefined>();
  const [basket, setBasket] = useState<{ info: Product, quantity: number }[]>([]);
  const [accessToken, setAccessToken] = useState<string | undefined>();
  const { onOpen } = useModal();
  const basketDrawerController = useDisclosure();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const refreshSession = async () => {
    supabase.auth.getUser().then(async ({ data, error }: any) => {
      if (error) throw error;
      const token = await supabase.auth.getSession();
      localStorage.setItem("a_token", token.data?.session?.access_token || "");
      setAccessToken(token.data?.session?.access_token);
      setUser(data.user ? data.user : {});
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      setLoading(false);
    });
  }

  const logout = async () => {
    setLoading(true);
    await supabase.auth.signOut().catch(e => console.log(e))
    setUser(undefined);
    setLoading(false);
  }

  const signIn = (provider: "google" | "facebook") => {
    setLoading(true);
    supabase.auth.signInWithOAuth({
      provider,
    }).then(({ data, error }: any) => {
      if (error) throw error;
      setUser(data.user ? data.user : {});
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      setLoading(false);
    });
  }

  const addToBasket = (item: Product, quant?: number) => {
    let index = 0;
    let bItem = basket.find((i, ind) => {
      index = ind;
      return i.info.id === item.id
    });
    if (!bItem) {
      bItem = { info: item, quantity: 0 };
      index = basket.length;
      basket[index] = bItem;
    }
    bItem.quantity = quant ? quant : bItem.quantity + 1;
    setBasket([...basket]);
    localStorage.setItem("lb_basket", JSON.stringify(basket));
    basketDrawerController.onOpen();
  }

  const removeFromBasket = (item: Product) => {
    setBasket(basket.filter((i: any) => i.info.id !== item.id));
    localStorage.setItem("lb_basket", JSON.stringify(basket));
  }

  useEffect(() => {
    refreshSession();
    const basket = localStorage.getItem("lb_basket");
    if (basket) setBasket(JSON.parse(basket));
  }, [router]);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        accessToken,
        basket,
        actions: {
          openBasket: basketDrawerController.onOpen || (() => { }),
          addToBasket,
          removeFromBasket,
          signInOpen: onOpen || (() => { }),
          refreshSession,
          logout,
          signIn
        }
      }}
    >
      {children}
      <LoginModal />
      <ShopBasketDrawer onClose={basketDrawerController.onClose} isOpen={basketDrawerController.isOpen} />
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext)
