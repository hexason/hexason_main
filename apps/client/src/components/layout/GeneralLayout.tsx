"use client";
import { Container, Stack } from "@chakra-ui/react";
import { TopAdBar, TopUpBar } from "../core";
import { usePathname } from "next/navigation";

export const GeneralLayout = ({ children, ...props }: any) => {
	const pathname = usePathname();
	return (
		<>
			<TopUpBar />
			{pathname === "/" ? <TopAdBar /> : null}
			<Container as={Stack} maxW="container.xl" {...props}>
				{children}
			</Container>
		</>
	);
}
