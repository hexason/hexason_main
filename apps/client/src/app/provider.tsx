// app/providers.tsx
"use client";
import apollo from "@/lib/Apollo";
import { SessionContextProvider } from "@/lib/supabase-react";
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import theme from "@/theme";
import { ApolloProvider } from "@apollo/client";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
	const [supabaseClient] = useState(() => createPagesBrowserClient())

	return (
		<CacheProvider>
			<ChakraProvider theme={theme}>
				<SessionContextProvider supabaseClient={supabaseClient}>
					<ApolloProvider client={apollo}>{children}</ApolloProvider>
				</SessionContextProvider>
			</ChakraProvider>
		</CacheProvider>
	);
}
