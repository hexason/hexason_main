import { Box, Container, useColorMode } from "@chakra-ui/react";
import { useEffect } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function Root({ children, ...props }: any) {
  const { toggleColorMode, colorMode } = useColorMode();

  useEffect(() => {
    if (colorMode === "dark") toggleColorMode();
  }, [colorMode]);
  return (
    <>
      <Box>
        <Navbar />
        <Container p={0} minH="80vh" maxW="container.lg" {...props}>
          {children}
        </Container>
        <Footer />
      </Box>
    </>
  )
}