"use client";
import { Button, Image, Stack, useToast } from "@chakra-ui/react";
import { SupabaseClient } from "@supabase/supabase-js";

export default function AuthForm({ supabaseClient }: { supabaseClient: SupabaseClient }) {
  const toast = useToast();
  const signInWithGoogle = async () => {
    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: process.env.NEXT_PUBLIC_REDIRECT_URL || "http://localhost:3001"
      }
    });
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        duration: 5000,
        isClosable: true,
        status: "error"
      })
    }
  }

  return (
    <Stack spacing={5} p={3}>
      <Button colorScheme="blackAlpha" borderRadius={"20px"} onClick={signInWithGoogle}>
        <Image h="50%" src={"https://cdn-icons-png.flaticon.com/512/2991/2991148.png"} mr={2} alt="Google" /> Login with Google
      </Button>
    </Stack>
  )
}