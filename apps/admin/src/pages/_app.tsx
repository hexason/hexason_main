import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import NextNProgress from "nextjs-progressbar"
import { ChakraProvider } from '@chakra-ui/react';
import { AuthContextProvider } from '@/context/AuthContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AuthContextProvider>
        <NextNProgress />
        <Component {...pageProps} />
      </AuthContextProvider>
    </ChakraProvider>
  )
}
