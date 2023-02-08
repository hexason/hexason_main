import { useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "../lib/Store";
import LoginModal from "../components/modals/LoginModal";
import { UserContextType } from "../interface/user";
import { User } from "@supabase/supabase-js";

export const UserContext = createContext<UserContextType>({ loading: true });
export default function UserContextProvider({ children }: any) {
  const [user, setUser] = useState<User | undefined>();
  const [accessToken, setAccessToken] = useState<string | undefined>();
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const refreshSession = async () => {
    supabase.auth.getUser().then(async ({ data, error }: any) => {
      if (error) throw error;
      const token = await supabase.auth.getSession();
      setAccessToken(token.data?.session?.access_token);
      setUser(data.user ? data.user : {});
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      setLoading(false);
    });
  }

  const logout = () => {
    setLoading(true);
    supabase.auth.signOut().catch(e => console.log(e)).finally(() => {
      setLoading(false);
    });
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

  useEffect(() => {
    refreshSession();
  }, [router]);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        accessToken,
        actions: {
          signInOpen: onOpen,
          refreshSession,
          logout,
          signIn
        }
      }}
    >
      {children}
      <LoginModal {...{ isOpen, onClose }} />
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext)
