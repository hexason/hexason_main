import { Session } from "@supabase/supabase-js";
export * from "./GraphqlSchema"

export type SupabaseAuthSession = Session | null;