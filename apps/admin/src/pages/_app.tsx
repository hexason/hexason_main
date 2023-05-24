import '@/assets/styles/globals.css'
import type { AppProps } from 'next/app'
import NextNProgress from "nextjs-progressbar"
import { ChakraProvider } from '@chakra-ui/react';
import { AuthContextProvider } from '@/context/AuthContext';
import { CustomerHead } from '@/components/core';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <CustomerHead />
      <AuthContextProvider>
        <NextNProgress />
        <Component {...pageProps} />
      </AuthContextProvider>
    </ChakraProvider>
  )
}
