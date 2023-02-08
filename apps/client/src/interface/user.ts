import { User } from "@supabase/supabase-js";

export type UserContextType = {
  user?: User;
  accessToken?: string;
  loading: boolean;
  actions?: {
    signInOpen: () => void;
    refreshSession: () => void;
    signIn: (provider: "google" | "facebook") => void;
    logout: () => void;
  }
}