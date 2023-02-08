import { User } from "@supabase/supabase-js";

export type UserContextType = {
  user?: User;
  accessToken?: string;
  loading: boolean;
  actions?: {
    openBasket: () => void;
    signInOpen: () => void;
    refreshSession: () => void;
    signIn: (provider: "google" | "facebook") => void;
    logout: () => Promise<void>;
  }
}