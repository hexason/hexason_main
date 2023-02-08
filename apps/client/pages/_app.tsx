import '@/src/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Root from "@/src/Root";
import UserContextProvider from '../src/context/UserContext';
import ReactGA from "react-ga4"
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    ReactGA.initialize("G-S2JLTKX9TL");
    if (router.isReady) ReactGA.send({ hitType: "pageview", page: router.pathname });
  }, [router.isReady]
  )

  return <ChakraProvider theme={extendTheme({
    config: {
      initialColorMode: "dark",
      useSystemColorMode: false,
    },
  })}>
    <UserContextProvider>
      <Root>
        <Component {...pageProps} />
      </Root>
    </UserContextProvider>
  </ChakraProvider>
}
