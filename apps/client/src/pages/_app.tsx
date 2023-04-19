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

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    ReactGA.initialize("G-S2JLTKX9TL");
    if (router.isReady) ReactGA.send({ hitType: "pageview", page: router.pathname });
  }, [router]);

  return (
    <ChakraProvider>
      <Head>
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
          </AnimatePresence>
        </AuthContextProvider>
      </Box>
    </ChakraProvider>
  )
}