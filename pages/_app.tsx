import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Root from "../src/Root";
import UserContextProvider from '../src/context/UserContext';
import { socket, SocketContext } from '../src/context/socket';

export default function App({ Component, pageProps }: AppProps) {
  return <ChakraProvider theme={extendTheme({
    config: {
      initialColorMode: "dark",
      useSystemColorMode: false,
    },
  })}>
    <UserContextProvider>
      <SocketContext.Provider value={socket}>
        <Root>
          <Component {...pageProps} />
        </Root>
      </SocketContext.Provider>
    </UserContextProvider>
  </ChakraProvider>
}
