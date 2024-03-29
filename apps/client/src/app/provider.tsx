// app/providers.tsx
"use client";
import apollo from "@/lib/Apollo";
import { SessionContextProvider } from "@/lib/supabase-react";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import theme from "@/theme";
import { ApolloProvider } from "@apollo/client";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { useState } from "react";
import { GeneralLayout } from "@/components/layout";
import { BasketProvider } from "@/context/BasketContext";
import { FavoriteProvider } from "@/context/FavoriteContext";
import { AddressProvider } from "@/context/AddressContext";
import { OrderProvider } from "@/context/OrderContext";

export function Providers({ children }: { children: React.ReactNode }) {
	const [supabaseClient] = useState(() => createPagesBrowserClient());

	return (
		<CacheProvider>
			<ChakraProvider theme={theme}>
				<SessionContextProvider supabaseClient={supabaseClient}>
					<ApolloProvider client={apollo}>
						<BasketProvider>
							<FavoriteProvider>
								<AddressProvider>
									<OrderProvider>
										<GeneralLayout>{children}</GeneralLayout>
									</OrderProvider>
								</AddressProvider>
							</FavoriteProvider>
						</BasketProvider>
					</ApolloProvider>
				</SessionContextProvider>
			</ChakraProvider>
		</CacheProvider>
	);
}
