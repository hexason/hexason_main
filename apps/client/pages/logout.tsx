import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { useUser } from "../src/context/UserContext";
import { useRouter } from "next/router";

export default function Logout() {
  const { logout } = useUser();
  const router = useRouter();

  useEffect(() => {
   if(logout) logout();
   router.replace("/");
  }, []);

  return (
    <Box>
      <h1>Logout</h1>
    </Box>
  )
}