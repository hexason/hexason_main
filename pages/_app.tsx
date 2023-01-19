import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Root from "../src/Root";

export default function App({ Component, pageProps }: AppProps) {
  return <ChakraProvider theme={extendTheme({
      // theme dark mode
      config: {
        initialColorMode: "dark",
        useSystemColorMode: false,
      },
    })}>
      <Root>
        <Component {...pageProps} />
      </Root>
  </ChakraProvider>
}
