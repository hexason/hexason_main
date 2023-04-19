import { Button, Divider, Image, Input, Stack, useToast } from "@chakra-ui/react";
import { SupabaseClient } from "@supabase/supabase-js";
import { useState } from "react";

export default function AuthForm({ supabaseClient }: { supabaseClient: SupabaseClient }) {
  const [userInput, setUserInput] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false);
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
  const signInWithPassword = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabaseClient.auth.signInWithPassword(userInput);
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        duration: 5000,
        isClosable: true,
        status: "error"
      })

    }
    setLoading(false);
  }
  const handleInput = (e: any) => {
    setUserInput(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))

  }

  return (
    <Stack spacing={5} p={3}>
      <form onSubmit={signInWithPassword} >
        <Stack>
          <Input onChange={handleInput} type="email" name="email" placeholder="Email" />
          <Input onChange={handleInput} type="password" name="password" placeholder="Password" />
          <Button colorScheme="blue" border="1px solid #fff" isLoading={loading} type="submit" borderRadius={"20px"} onClick={() => { }}>Log In</Button>
        </Stack>
      </form>
      <Divider />
      <Button colorScheme="blackAlpha" borderRadius={"20px"} onClick={signInWithGoogle}>
        <Image h="50%" src={"https://cdn-icons-png.flaticon.com/512/2991/2991148.png"} mr={2} alt="Google" /> Google
      </Button>
    </Stack>
  )
}