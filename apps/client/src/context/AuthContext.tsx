import DefaultAnimate from '@/components/animation/DefaultAnimate';
import { SupabaseAuthSession } from '@/lib/types';
import { supabase } from '@/lib/Supabase';
import { Button, useToast } from '@chakra-ui/react';
import { SupabaseClient } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export const AuthContext = createContext<{ session: SupabaseAuthSession, supabase: SupabaseClient }>({ session: null, supabase });
export const AuthContextProvider = ({ children }: any) => {
  const [session, setSession] = useState<SupabaseAuthSession>(null);
  const toast = useToast();
  const router = useRouter();
  const [isBackable, setBackable] = useState(true);

  useEffect(() => {
    if (router.asPath === "/") setBackable(false);
    else setBackable(true);
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)

    })
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    })

    return () => subscription.unsubscribe()
  }, [toast, router]);

  return (
    <AuthContext.Provider value={{
      session,
      supabase
    }}>
      <DefaultAnimate>
        {isBackable && <Button m="3" onClick={router.back} colorScheme="whiteAlpha">{"< Буцах"}</Button>}
        {session && <Button float={"right"} m="3" colorScheme='red' onClick={() => supabase.auth.signOut()}>Гарах</Button>}
         {children}
      </DefaultAnimate>
    </AuthContext.Provider>
  )
}
export const useAuth = () => useContext(AuthContext);