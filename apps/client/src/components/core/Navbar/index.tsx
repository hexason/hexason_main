"use client";
import { Box } from "@chakra-ui/react";
import { TopAdBar } from "./TopAdBar"
import { TopUpBar } from "./TopUpBar"

export * from "./TopAdBar"
export * from "./TopUpBar"

export default function Navbar() {
  return (
    <Box w="100%" display={{ base: "none", md: "block" }}>
      <TopUpBar />
      <TopAdBar />
    </Box>
  )

}