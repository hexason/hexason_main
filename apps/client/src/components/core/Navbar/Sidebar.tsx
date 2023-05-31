import { Stack, Button, Box, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";
import { useSupabaseClient } from "@/lib/supabase-react"

export const AdminSidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Stack>
      <MobileSideBar {...{ isOpen, onOpen, onClose }} />
      <Stack display={{ base: "flex", md: "none" }}>
        <Box p={6}>
          <Button onClick={onOpen}>Menu</Button>
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
      isActive={isActive}
      borderRadius={"0 20px 20px 0"}
      p={1}
      pl={6}
      cursor={"pointer"}
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
  const supabase = useSupabaseClient();

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
      </Box>
      <Divider />
      {buttons.map((el: any) => <SidebarButton
        onClick={() => router.push(el.url)}
        isActive={el.url === active} key={el.url}>{el.txt}</SidebarButton>)}
      <Divider />
      <Stack p={3}>
        <Button onClick={() => supabase.auth.signOut()}>Log Out</Button>
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
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerBody p={0} pr={6}>
          <SidebarContent />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}