import { Session } from "@supabase/supabase-js"

export type SupabaseAuthSession = {
  session: Session | null
}