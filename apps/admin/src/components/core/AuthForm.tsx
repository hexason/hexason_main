import { Button } from "@chakra-ui/react";
import { SupabaseClient } from "@supabase/supabase-js";

export default function AuthForm({ supabaseClient }: { supabaseClient: SupabaseClient }) {
  const signInWithGoogle = async () => {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: 'google',
    })
  }

  return (
    <>
      <Button onClick={signInWithGoogle}>Google</Button>
    </>
  )
}