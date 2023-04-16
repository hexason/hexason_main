import '@/assets/styles/globals.css'
import type { AppProps } from 'next/app'
import NextNProgress from "nextjs-progressbar"
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { AuthContextProvider } from '@/context/AuthContext';
import CustomerHead from '@/components/core/CustomHead';

const theme = extendTheme({
  components: {
    Popover: {
      variants: {
        picker: {
          popper: {
            maxWidth: "unset",
            width: "unset"
          }
        }
      }
    }
  }
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <CustomerHead />
      <AuthContextProvider>
        <NextNProgress />
        <Component {...pageProps} />
      </AuthContextProvider>
    </ChakraProvider>
  )
}
