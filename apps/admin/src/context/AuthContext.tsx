import LayoutBuilder from '@/components/LayoutBuilder';
import DefaultAnimate from '@/components/animation/DefaultAnimate';
import AuthForm from '@/components/core/Auth/AuthForm';
import AuthLayout from '@/components/core/Auth/AuthLayout';
import { supabase } from '@/lib/Supabase';
import { SupabaseAuthSession } from '@/lib/types';
import { useToast } from '@chakra-ui/react';
import { SupabaseClient } from '@supabase/supabase-js';
import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext<{ session: SupabaseAuthSession, supabase: SupabaseClient }>({ session: null, supabase });
export const AuthContextProvider = ({ children }: any) => {
  const [session, setSession] = useState<SupabaseAuthSession>(null);
  const toast = useToast();

  const permissionCheck = (session: SupabaseAuthSession) => {
    axios({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      url: "/admin/me",
      headers: {
        Authorization: "Bearer " + session?.access_token
      }
    }).then(() =>
      setSession(session)
    ).catch(() => {
      supabase.auth.signOut();
      setSession(session);
      toast({
        title: "Permission Denied",
        description: "Sorry, You're not permitted user",
        status: "error",
        duration: 4000,
        isClosable: true
      })
    });
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      permissionCheck(session);
    })
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (_event !== "SIGNED_OUT") permissionCheck(session);
      else setSession(session);
    })

    return () => subscription.unsubscribe()
  }, []);

  return (
    <AuthContext.Provider value={{
      session,
      supabase
    }}>
      <DefaultAnimate>
        {session ?
          <LayoutBuilder>
            {children}
          </LayoutBuilder>
          : (
            <AuthLayout>
              <AuthForm supabaseClient={supabase} />
            </AuthLayout>
          )}
      </DefaultAnimate>
    </AuthContext.Provider>
  )
}
export const useAuth = () => useContext(AuthContext);