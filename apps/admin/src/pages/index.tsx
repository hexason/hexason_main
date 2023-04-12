import { useAuth } from "@/context/AuthContext";
import { Button, Grid } from "@chakra-ui/react";

export default function Home() {
  const { session, supabase } = useAuth();
  return (
    <Grid templateColumns={"repeat(2, 1fr)"} gap={6}>
      {session?.user.email}
      <Button onClick={() => supabase.auth.signOut()}>log out</Button>
    </Grid>
  )
}
