import { Box, Container, useColorMode } from "@chakra-ui/react";
import Head from "next/head";
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
      <Head>
        <title>LoveBox</title>
        <meta name="description" content="Дэско" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <Navbar />
        <Container p={0} minH="90vh" maxW="container.lg" {...props}>
          {children}
        </Container>
        <Container p={0} maxW="container.lg" {...props}>
        </Container>
        <Footer />
      </Box>
    </>
  )
}