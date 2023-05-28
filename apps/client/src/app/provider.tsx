// app/providers.tsx
"use client";
import { AuthContextProvider } from "@/context/AuthContext";
import apollo from "@/lib/Apollo";
import theme from "@/theme";
import { ApolloProvider } from "@apollo/client";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<CacheProvider>
			<ChakraProvider theme={theme}>
				<AuthContextProvider>
					<ApolloProvider client={apollo}>{children}</ApolloProvider>
				</AuthContextProvider>
			</ChakraProvider>
		</CacheProvider>
	);
}
