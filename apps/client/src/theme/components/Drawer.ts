import { drawerAnatomy as parts } from "@chakra-ui/anatomy";
import {
	createMultiStyleConfigHelpers,
	defineStyle,
} from "@chakra-ui/styled-system";
import { runIfFn } from "../utils";

const { definePartsStyle, defineMultiStyleConfig } =
	createMultiStyleConfigHelpers(parts.keys);

const baseStyleDialogContainer = defineStyle({
	backdropFilter: "blur(5px)",
});

const baseStyleDialog = defineStyle((props) => {
	return {
		borderRadius: "xl",
		margin: 2,
	};
});

const baseStyle = definePartsStyle((props) => ({
	dialogContainer: baseStyleDialogContainer,
	dialog: runIfFn(baseStyleDialog, props),
}));

const Drawer = defineMultiStyleConfig({
	baseStyle,
	defaultProps: {
		size: "xs",
	},
});

export default Drawer;
