import '@/src/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Root from "@/src/Root";
import UserContextProvider from '../src/context/UserContext';
import ReactGA from "react-ga4"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ModalContextProvider from '@/src/context/ModalContext';
import AppContextProvider from '@/src/context/AppContext';
import { CONFIG_CONST } from '@/src/constant/config_const';
import { useAxios } from '@/src/utils/axiosHook';
import NextNProgress from "nextjs-progressbar"
import FacebookPixel from '@/src/components/other/FacebooPixel';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { fetch } = useAxios("/init", {}, "get");
  const [colors, setColors] = useState(CONFIG_CONST.colors);

  useEffect(() => {
    ReactGA.initialize("G-S2JLTKX9TL");
    if (router.isReady) ReactGA.send({ hitType: "pageview", page: router.pathname });

    fetch().then((data) => {
      setColors({
        primary: {
          100: data.colors['primary.color.100'],
          200: data.colors['primary.color.200'],
          300: data.colors['primary.color.300'],
          400: data.colors['primary.color.400'],
          500: data.colors['primary.color.500'],
          600: data.colors['primary.color.600'],
          700: data.colors['primary.color.700'],
          800: data.colors['primary.color.800'],
        }
      } as any);
    })
  }, [router.isReady]
  )

  return <ChakraProvider theme={extendTheme({
    config: {
      initialColorMode: "light",
      useSystemColorMode: false,
    },
    colors,
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
          <FacebookPixel />
          <NextNProgress />
          <Root>
            <Component {...pageProps} />
          </Root>
        </UserContextProvider>
      </ModalContextProvider>
    </AppContextProvider>
  </ChakraProvider>
}