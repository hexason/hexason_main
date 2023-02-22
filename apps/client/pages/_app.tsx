import '@/src/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Root from "@/src/Root";
import UserContextProvider from '../src/context/UserContext';
import ReactGA from "react-ga4"
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import ModalContextProvider from '@/src/context/ModalContext';
import AppContextProvider from '@/src/context/AppContext';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const {app} = pageProps;

  useEffect(() => {
    ReactGA.initialize("G-S2JLTKX9TL");
    console.log("App is here",app)
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
        100: "#FED7E2",
        200: "#FBB6CE",
        300: "#F687B3",
        400: "#ED64A6",
        500: "#D53F8C",
        600: "#B83280",
        700: "#97266D",
        800: "#702459",
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
