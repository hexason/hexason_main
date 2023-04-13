import { useAuth } from "@/context/AuthContext";
import { Stack, Button, Box, Divider } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const [active, setActive] = useState("");
  const { session, supabase } = useAuth();
  const [buttons, setButtons] = useState<any>([]);
  const router = useRouter();
  useEffect(() => {
    if (router.isReady) setActive(router.pathname)
    axios({
      baseURL: "/",
      url: "/api/pages"
    }).then(el => setButtons(el.data))
      .catch(console.log)
  }, [router])

  return (
    <Stack>
      <Stack minH={"600px"}>
        <Box p={6}>
          {session?.user.email}
        </Box>
        <Divider />
        {buttons.map((el: any) => <SidebarButton
          onClick={() => router.push(el.url)}
          isActive={el.url === active} key={el.url}>{el.txt}</SidebarButton>)}
      </Stack>
      <Divider />
      <Stack p={3}>
        <Button colorScheme="blackAlpha" onClick={() => supabase.auth.signOut()}>Log Out</Button>
      </Stack>
    </Stack>
  )
}

function SidebarButton({ children, isActive, onClick }: any) {
  return (
    <Button
      colorScheme=""
      bg={isActive && "linear-gradient(98deg, rgb(198, 167, 254), rgb(145, 85, 253) 94%)"}
      borderRadius={"0 20px 20px 0"}
      p={1}
      pl={6}
      cursor={"pointer"}
      _hover={{
        bg: isActive ? "linear-gradient(98deg, rgb(198, 167, 254), rgb(145, 85, 253) 94%)" : "gray.400"
      }}
      transition={"0.3s"}
      onClick={onClick}
      textTransform={"capitalize"}
    >
      {children}
    </Button>
  )
}