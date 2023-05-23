// app/providers.tsx
'use client'
import apollo from '@/lib/Apollo'
import { ApolloProvider } from '@apollo/client'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

export function Providers({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <CacheProvider>
      <ChakraProvider theme={extendTheme({
        config: {
          initialColorMode: 'light',
          useSystemColorMode: false,
        },
        styles: {
          global: {
            body: {
              bg: "#D2d2d4"
            }
          }
        }
      })}>
        <ApolloProvider client={apollo}>
          {children}
        </ApolloProvider>
      </ChakraProvider>
    </CacheProvider>
  )
}