import { Box, Container, useColorMode } from "@chakra-ui/react";
import Head from "next/head";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function Root({ children, ...props }: any) {
  const { toggleColorMode, colorMode } = useColorMode();
  if (colorMode === "light") toggleColorMode();

  return (
    <>
      <Head>
        <title>CUBEZET | Your smart investment area</title>
        <meta name="description" content="Invest, Work, Play, Do something then Earn" />
        <meta property="og:image" content="https://cdn.midjourney.com/d94a3aa1-ffc6-4b63-8bba-da407b8b1ea3/grid_0.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <Container p={0} minH="90vh" maxW="container.lg" {...props}>
          <Navbar />
          {children}
        </Container>
        <Container p={0} maxW="container.lg" {...props}>
          <Footer />
        </Container>
      </Box>
    </>
  )
}