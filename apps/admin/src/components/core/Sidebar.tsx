import { useAuth } from "@/context/AuthContext";
import { Stack, Button, Box, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Stack>
      <MobileSideBar {...{ isOpen, onOpen, onClose }} />
      <Stack display={{ base: "flex", md: "none" }}>
        <Box p={6}>
          <Button colorScheme="blackAlpha" onClick={onOpen}>Menu</Button>
        </Box>
      </Stack>
      <Stack display={{ base: "none", md: "flex" }} minH={"600px"}>
        <SidebarContent />
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


function SidebarContent() {
  const [active] = useState("");
  const [buttons, setButtons] = useState<any>([]);
  const router = useRouter();
  const { session, supabase } = useAuth();

  useEffect(() => {
    setButtons([
      {
        url: "/",
        txt: "Home",
        order: 1
      },
      {
        url: "/page/product",
        txt: "Products",
        order: 0
      },
      {
        url: "/page/integration",
        txt: "Integrations",
        order: 0
      },
    ])
  }, [router])
  return (
    <Stack minH={"600px"}>
      <Box p={6}>
        {session?.user.email}
      </Box>
      <Divider />
      {buttons.map((el: any) => <SidebarButton
        onClick={() => router.push(el.url)}
        isActive={el.url === active} key={el.url}>{el.txt}</SidebarButton>)}
      <Divider />
      <Stack p={3}>
        <Button colorScheme="blackAlpha" onClick={() => supabase.auth.signOut()}>Log Out</Button>
      </Stack>
    </Stack>
  )
}
function MobileSideBar({ isOpen, onClose }: any) {

  return (
    <Drawer
      isOpen={isOpen}
      placement='left'
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent bg={"#28243D"} color="gray.200">
        <DrawerCloseButton />
        <DrawerBody p={0} pr={6}>
          <SidebarContent />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}