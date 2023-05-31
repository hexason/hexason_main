"use client";
import { Container, Stack } from "@chakra-ui/react";
import { TopAdBar, TopUpBar } from "../core";

export const GeneralLayout = ({ children, ...props }: any) => {
	return (
		<>
			<TopUpBar />
			<TopAdBar />
			<Container as={Stack} maxW="container.xl" {...props}>
				{children}
			</Container>
		</>
	);
}
