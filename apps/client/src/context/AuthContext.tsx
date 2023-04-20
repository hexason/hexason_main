import DefaultAnimate from '@/components/animation/DefaultAnimate';
import { SupabaseAuthSession } from '@/lib/types';
import { supabase } from '@/lib/Supabase';
import { Box, Button, useToast } from '@chakra-ui/react';
import { SupabaseClient } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext<{ session: SupabaseAuthSession, supabase: SupabaseClient }>({ session: null, supabase });
export const AuthContextProvider = ({ children }: any) => {
  const [session, setSession] = useState<SupabaseAuthSession>(null);
  const toast = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)

    })
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    })

    return () => subscription.unsubscribe()
  }, [toast]);

  return (
    <AuthContext.Provider value={{
      session,
      supabase
    }}>
      <DefaultAnimate>
        {session && <Button colorScheme='blackAlpha' position={"absolute"} top={20} right={20} onClick={() => supabase.auth.signOut()}>Log out</Button>
        } {children}
      </DefaultAnimate>
    </AuthContext.Provider>
  )
}
export const useAuth = () => useContext(AuthContext);