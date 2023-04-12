import { useAuth } from "@/context/AuthContext";
import { Stack, Button, Box, Divider } from "@chakra-ui/react";

export default function Sidebar() {
  const { session, supabase } = useAuth();

  return (
    <Stack>
      <Stack minH={"600px"}>
        <Box p={6}>
          {session?.user.email}
        </Box>
        <Divider />
        <SidebarButton isActive={true}>
          Menu
        </SidebarButton>
        <SidebarButton>
          Not active
        </SidebarButton>
      </Stack>
      <Divider />
      <Stack p={3}>
        <Button colorScheme="blackAlpha" onClick={() => supabase.auth.signOut()}>Log Out</Button>
      </Stack>
    </Stack>
  )
}

function SidebarButton({ children, isActive }: any) {
  return (
    <Box
      bg={isActive && "linear-gradient(98deg, rgb(198, 167, 254), rgb(145, 85, 253) 94%)"}
      borderRadius={"0 20px 20px 0"}
      p={1}
      pl={6}
      cursor={"pointer"}
      _hover={{
        bg: isActive ? "linear-gradient(98deg, rgb(198, 167, 254), rgb(145, 85, 253) 94%)" : "gray.400"
      }}
      transition={"0.3s"}
    >
      {children}
    </Box>
  )
}