import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUser } from "../../src/context/UserContext";

export default function User() {
  const {user} = useUser();
  const router = useRouter();
  
  useEffect(() => {
    if (!user.id) {
      router.replace("/");
    } else {
      router.replace("/user/"+user.id);
    }
  }, [])
  return (
    <Box>
      <h1>Loading...</h1>
    </Box>
  )
}