import { extendTheme } from "@chakra-ui/react";
import foundations from "./foundations";
import components from "./components";
import styles from "./styles";

const config = {
	useSystemColorMode: false,
	initialColorMode: "light",
	cssVarPrefix: "hexason",
};

export const theme = {
	...foundations,
	components,
	config,
	styles,
};

export default extendTheme(theme);
