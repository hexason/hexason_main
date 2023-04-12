import DefaultAnimate from '@/components/core/Animation/DefaultAnimate';
import AuthForm from '@/components/core/Auth/AuthForm';
import AuthLayout from '@/components/core/Auth/AuthLayout';
import { supabase } from '@/lib/Supabase';
import { SupabaseAuthSession } from '@/lib/types';
import { Session, SupabaseClient } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext<{ session: SupabaseAuthSession, supabase: SupabaseClient }>({ session: null, supabase });
export const AuthContextProvider = ({ children }: any) => {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{
      session,
      supabase
    }}>
      <DefaultAnimate>
        {session ? children : (
          <AuthLayout>
            <AuthForm supabaseClient={supabase} />
          </AuthLayout>
        )}
      </DefaultAnimate>
    </AuthContext.Provider>
  )
}
export const useAuth = () => useContext(AuthContext);