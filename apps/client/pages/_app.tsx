import '@/src/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme, useColorModeValue } from "@chakra-ui/react";
import Root from "@/src/Root";
import UserContextProvider from '../src/context/UserContext';
import ReactGA from "react-ga4"
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import ModalContextProvider from '@/src/context/ModalContext';
import AppContextProvider from '@/src/context/AppContext';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    ReactGA.initialize("G-S2JLTKX9TL");
    if (router.isReady) ReactGA.send({ hitType: "pageview", page: router.pathname });
  }, [router.isReady]
  )

  return <ChakraProvider theme={extendTheme({
    config: {
      initialColorMode: "light",
      useSystemColorMode: false,
    },
    colors: {
      primary: {
        100:"#B2F5EA",
        200: "#81E6D9",
        300: "#4FD1C5",
        400: "#38B2AC",
        500: "#319795",
        600: "#2C7A7B",
        700: "#285E61",
        800: "#234E52",
        900: "#1D4044",
      }
    },
    styles: {
      global: {
        body: {
          bg: "whiteAlpha.900",
        },
      },
    },
  })}>
    <AppContextProvider>
      <ModalContextProvider>
        <UserContextProvider>
          <Root>
            <Component {...pageProps} />
          </Root>
        </UserContextProvider>
      </ModalContextProvider>
    </AppContextProvider>
  </ChakraProvider>
}
