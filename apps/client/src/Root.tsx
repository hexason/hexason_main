import { Box, Container } from "@chakra-ui/react";
import Head from "next/head";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { useApp } from "./context/AppContext";

export default function Root({ children, ...props }: any) {
  const { title, description } = useApp();
  return (
    <>
      <Head>
        <title>{title || "Hexason"}</title>
        <meta property="og:url" content="https://hexason.com" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title || "Hexason Game Agency"} />
        <meta property="og:description" content={description || "This is your area. Create something amazing."} />
        <meta property="og:image" content="http://file.firebat.com.cn/FtGLwoPAAjEhy9IB43xcSdVxi6bE" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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