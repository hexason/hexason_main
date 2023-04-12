import { Avatar, Box, HStack } from "@chakra-ui/react";

export default function Navbar() {
  return (
    <HStack justifyContent={"space-between"} p={4}>
      <HStack>
        <Box>Ху</Box>
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