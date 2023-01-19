import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Root from "../src/Root";
import UserContextProvider from '../src/context/UserContext';

export default function App({ Component, pageProps }: AppProps) {
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
