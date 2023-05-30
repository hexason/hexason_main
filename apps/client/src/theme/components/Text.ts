import { defineStyleConfig } from "@chakra-ui/react";

const Text = defineStyleConfig({
	variants: {
		title: {
			fontWeight: "bold",
			fontSize: "lg",
		},
		title2: {
			fontWeight: "semibold",
			fontSize: "md",
		},
		body: {
			fontWeight: "semibold",
			fontSize: "sm",
		},
		body2: {
			fontSize: "sm",
		},
		body2Alpha: {
			fontSize: "sm",
			opacity: 0.6,
		},
		body3: {
			fontSize: "xs",
		},
	},
});

export default Text;
