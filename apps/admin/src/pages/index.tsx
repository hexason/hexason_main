import { useAuth } from "@/context/AuthContext";
import { Grid } from "@chakra-ui/react";

export default function Home() {
  const { session } = useAuth();
  return (
    <Grid templateColumns={"repeat(2, 1fr)"} gap={6}>
      {session?.user.email}
    </Grid>
  )
}
