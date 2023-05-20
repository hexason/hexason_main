// app/providers.tsx
'use client'
import apollo from '@/lib/Apollo'
import { ApolloProvider } from '@apollo/client'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'

export function Providers({
  children
}: {
  children: React.ReactNode
}) {

  return (
    <CacheProvider>
      <ChakraProvider>
        <ApolloProvider client={apollo}>
          {children}
        </ApolloProvider>
      </ChakraProvider>
    </CacheProvider>
  )
}