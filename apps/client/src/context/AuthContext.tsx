/**
 * @deprecated now use useSession useSupabaseClient from @/lib/Supabase
 */
"use client";
import DefaultAnimate from "@/components/animation/DefaultAnimate";
import { SupabaseAuthSession } from "@/lib/types";
import { supabase } from "@/lib/Supabase";
import { Button } from "@chakra-ui/react";
import { SupabaseClient } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext<{
	session: SupabaseAuthSession;
	supabase: SupabaseClient;
}>({ session: null, supabase });
export const AuthContextProvider = ({ children }: any) => {
	const [session, setSession] = useState<SupabaseAuthSession>(null);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});

		return () => subscription.unsubscribe();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				session,
				supabase,
			}}
		>
			<DefaultAnimate>
				{session && (
					<Button
						float={"right"}
						m="3"
						colorScheme="red"
						onClick={() => supabase.auth.signOut()}
					>
						Гарах
					</Button>
				)}
				{children}
			</DefaultAnimate>
		</AuthContext.Provider>
	);
};
export const useAuth = () => useContext(AuthContext);
