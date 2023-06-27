/* eslint-disable react-hooks/exhaustive-deps */
import { AuthError, Session, SupabaseClient } from "@supabase/supabase-js";
import axios from "axios";
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type SessionContext =
  | {
    isLoading: true;
    session: null;
    error: null;
    supabaseClient: SupabaseClient;
    user?: any;
  }
  | {
    isLoading: false;
    session: Session;
    error: null;
    supabaseClient: SupabaseClient;
    user?: any;
  }
  | {
    isLoading: false;
    session: null;
    error: AuthError;
    supabaseClient: SupabaseClient;
    user?: any;
  }
  | {
    isLoading: false;
    session: null;
    error: null;
    supabaseClient: SupabaseClient;
    user?: any;
  };

const SessionContext = createContext<SessionContext>({
  isLoading: true,
  session: null,
  error: null,
  supabaseClient: {} as any,
});

export interface SessionContextProviderProps {
  supabaseClient: SupabaseClient;
  initialSession?: Session | null;
  user?: any;
}

export const SessionContextProvider = ({
  supabaseClient,
  initialSession = null,
  children,
}: PropsWithChildren<SessionContextProviderProps>) => {
  const [session, setSession] = useState<Session | null>(initialSession);
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(!initialSession);
  const [error, setError] = useState<AuthError>();

  useEffect(() => {
    let mounted = true;

    async function getSession() {
      const {
        data: { session },
        error,
      } = await supabaseClient.auth.getSession();

      // only update the react state if the component is still mounted
      if (mounted) {
        if (error) {
          setError(error);
          setIsLoading(false);
          return;
        }
        await axios({
          baseURL: process.env.NEXT_PUBLIC_API_URL,
          url: "admin/me",
          method: "GET",
          headers: {
            Authorization: "Bearer " + session?.access_token,
          },
        })
          .then(({ data }) => {
            setUser(data ? { ...data, ...session?.user } : null);
          })
          .catch(console.log);
        localStorage.setItem("utk", session?.access_token || "");
        setSession(session);
        setIsLoading(false);
      }
    }

    getSession();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange(async (event, session) => {
      if (session && (event === "SIGNED_IN" || event === "TOKEN_REFRESHED")) {
        await axios({
          baseURL: process.env.NEXT_PUBLIC_API_URL,
          url: "admin/me",
          method: "GET",
          headers: {
            Authorization: "Bearer " + session?.access_token,
          },
        })
          .then(({ data }) => {
            setUser({ ...data, ...session.user });
          })
          .catch(() => setUser(session.user));
        localStorage.setItem("utk", session?.access_token || "");
        setSession(session);
      }

      if (event === "SIGNED_OUT") {
        setUser(null);
        setSession(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const value: SessionContext = useMemo(() => {
    if (isLoading) {
      return {
        isLoading: true,
        session: null,
        error: null,
        user,
        supabaseClient,
      };
    }

    if (error) {
      return {
        isLoading: false,
        session: null,
        error,
        user,
        supabaseClient,
      };
    }

    return {
      isLoading: false,
      session,
      error: null,
      user,
      supabaseClient,
    };
  }, [isLoading, session, error]);

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};

export const useSessionContext = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error(
      `useSessionContext must be used within a SessionContextProvider.`
    );
  }

  return context;
};

export function useSupabaseClient<
  Database = any,
  SchemaName extends string & keyof Database = "public" extends keyof Database
  ? "public"
  : string & keyof Database
>() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error(
      `useSupabaseClient must be used within a SessionContextProvider.`
    );
  }

  return context.supabaseClient as SupabaseClient<Database, SchemaName>;
}

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error(`useSession must be used within a SessionContextProvider.`);
  }

  return context.session;
};

export const useUser = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a SessionContextProvider.`);
  }

  return context?.user ?? null;
};
