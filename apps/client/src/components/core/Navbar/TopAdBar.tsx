"use client";
import { Box, Image, Container } from "@chakra-ui/react";

export const TopAdBar = () => {
	return (
		<Box w="100%" pos="relative" overflow="hidden">
			<Box
				pos="absolute"
				zIndex={-1}
				w="100%"
				h="100%"
				bgImage="https://gw.alicdn.com/imgextra/i3/O1CN01cYXuc924autmk1doL_!!6000000007408-2-tps-1190-80.png_.webp"
				bgSize="cover"
				bgPos="center"
				filter="blur(40px)"
			/>
			<Container maxW="container.lg">
				<Image
					h="75px"
					w="100%"
					src="https://gw.alicdn.com/imgextra/i3/O1CN01cYXuc924autmk1doL_!!6000000007408-2-tps-1190-80.png_.webp"
				/>
			</Container>
		</Box>
	);
};
