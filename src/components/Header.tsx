import { Box, Container } from "@chakra-ui/react";

import Navbar from "./Navbar";

export default function Header() {
  

  return (
    <Box
      minH={"100vh"}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
    >
      <Navbar />
      <Container maxW="container.fill">
        <Box bg="white" opacity="0.5" height={"30vh"} mx="auto" width={"100%"}></Box>
      </Container>
    </Box>
  )
}