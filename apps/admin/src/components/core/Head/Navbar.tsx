import { Avatar, Box, HStack } from "@chakra-ui/react";

export const Navbar = () => {
  return (
    <HStack display={{ base: "none", md: "flex" }} justifyContent={"space-between"} p={4}>
      <HStack>
        <Box></Box>
      </HStack>
      <HStack
        alignItems={"center"}
      >
        <Box>
          <Avatar size={"sm"} src="" />
        </Box>
      </HStack>
    </HStack>
  )
}