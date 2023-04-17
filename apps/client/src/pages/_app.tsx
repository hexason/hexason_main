import '@/src/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, Heading, Stack, extendTheme } from "@chakra-ui/react";
import UserContextProvider from '../context/UserContext';
import ReactGA from "react-ga4"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ModalContextProvider from '@/src/context/ModalContext';
import AppContextProvider from '@/src/context/AppContext';
import { CONFIG_CONST } from '@/src/constant/config_const';
import { useAxios } from '@/src/utils/axiosHook';
import NextNProgress from "nextjs-progressbar"
import FacebookPixel from '@/src/components/other/FacebooPixel';
import Head from 'next/head';
import { motion } from 'framer-motion';
import ThreeDotsWave from '../components/animation/ThreeDotsWave';

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
  const DotVariants = {
    initial: {
      y: "0%"
    },
    animate: {
      y: "100%"
    }
  };
  
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
          <Head>
            <meta name="facebook-domain-verification" content={process.env.NEXT_PUBLIC_FACEBOOK_DOMAIN_VERIFY} />
            <FacebookPixel />
          </Head>
          <NextNProgress />
          <Stack
            w="100%"
            h="100vh" position="fixed" top="0" left="0" zIndex="99" bg="#000000"
            alignItems={"center"}
            justifyContent={"center"}
          >
            {/* infinite animation fade in fade out */}
            <Heading
              as={motion.div}
              color={"white"}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
            >Coming soon</Heading>
            <ThreeDotsWave />
          </Stack>
          {/* <Root>
            <Component {...pageProps} />
          </Root> */}
        </UserContextProvider>
      </ModalContextProvider>
    </AppContextProvider>
  </ChakraProvider>
}