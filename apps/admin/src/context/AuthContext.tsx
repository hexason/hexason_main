import AuthForm from '@/components/core/AuthForm';
import { supabase } from '@/lib/Supabase';
import { SupabaseAuthSession } from '@/lib/types';
import { Session } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext<SupabaseAuthSession>({ session: null });
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

  if (!session) {
    return (<AuthForm supabaseClient={supabase} />)
  }
  else {
    return (
      <AuthContext.Provider value={{
        session
      }}>
        {children}
      </AuthContext.Provider>
    )
  }
}
export const useAuth = () => useContext(AuthContext);