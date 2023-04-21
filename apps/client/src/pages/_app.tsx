import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Box, ChakraProvider } from "@chakra-ui/react";
import ReactGA from "react-ga4"
import NextNProgress from "nextjs-progressbar"
import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContextProvider } from '@/context/AuthContext';
import { AnimatePresence } from 'framer-motion';
import { Analytics } from "@vercel/analytics/react"

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    ReactGA.initialize("G-S2JLTKX9TL");
    if (router.isReady) ReactGA.send({ hitType: "pageview", page: router.pathname });
  }, [router]);

  return (
    <ChakraProvider>
      <Head>
        <title>HEX as ON | All in one universe</title>
        <meta property="og:url" content="https://hexason.com" />
        <meta property="og:title" content="Hexason" />
        <meta property="og:description" content={"All in one universe"} />
        <meta property="og:image" content="https://scontent.fuln6-1.fna.fbcdn.net/v/t39.30808-6/330797995_516059910647704_2620251664384262155_n.png?_nc_cat=106&ccb=1-7&_nc_sid=e3f864&_nc_ohc=RJk8A8UjVp0AX_alyqw&_nc_ht=scontent.fuln6-1.fna&oh=00_AfAB0K4YGMzdTe3SHvSXgGfEX1waXBz2QbDe7CsnFcEd8w&oe=6420875B" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="facebook-domain-verification" content={process.env.NEXT_PUBLIC_FACEBOOK_DOMAIN_VERIFY} />
      </Head>
      <Box
        w="100%"
        minH="100vh"
        bg="#000"
        color="white"
      >
        <NextNProgress />
        <AuthContextProvider>
          <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
            <Component {...pageProps} key={router.asPath} />
            <Analytics />
          </AnimatePresence>
        </AuthContextProvider>
      </Box>
    </ChakraProvider>
  )
}