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
        <title>{title || "MyApp"}</title>
        <meta property="og:url" content="https://hexason.com" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title || "Creative Agency"} />
        <meta property="og:description" content={description || "This is your area. Create something amazing."} />
        <meta property="og:image" content="https://i.ibb.co/zm50vN2/vecteezy-shopping-online-on-smartphone-and-new-buy-sale-promotion-7153463.jpg" />
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