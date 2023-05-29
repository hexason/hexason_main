import '@/assets/styles/globals.css'
import type { AppProps } from 'next/app'
import NextNProgress from "nextjs-progressbar"
import { ChakraProvider } from '@chakra-ui/react';
import { CustomerHead } from '@/components/core';
import { SessionContextProvider } from '@/lib/supabase-react'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react';
import { LayoutBuilder } from '@/components/layout';

export default function App({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() => createPagesBrowserClient())
  return (
    <ChakraProvider>
      <CustomerHead />
      <SessionContextProvider supabaseClient={supabaseClient}>
        <NextNProgress />
        <LayoutBuilder>
          <Component {...pageProps} />
        </LayoutBuilder>
      </SessionContextProvider>
    </ChakraProvider>
  )
}
