import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";
import { mode, transparentize } from "@chakra-ui/theme-tools";

const baseStyle = defineStyle({
	lineHeight: "1.2",
	borderRadius: "xl",
	fontWeight: "semibold",
	transitionProperty: "common",
	transitionDuration: "normal",
	_focusVisible: {
		boxShadow: "outline",
	},
	_disabled: {
		opacity: 0.4,
		cursor: "not-allowed",
		boxShadow: "none",
	},
	_hover: {
		_disabled: {
			bg: "initial",
		},
	},
});

type AccessibleColor = {
	bg?: string;
	color?: string;
	hoverBg?: string;
	activeBg?: string;
};

const accessibleColorMap: { [key: string]: AccessibleColor } = {
	yellow: {
		bg: "yellow.400",
		color: "black",
		hoverBg: "yellow.500",
		activeBg: "yellow.600",
	},
	cyan: {
		bg: "cyan.400",
		color: "black",
		hoverBg: "cyan.500",
		activeBg: "cyan.600",
	},
};

const variantSolid = defineStyle((props) => {
	const { colorScheme: c } = props;

	if (c === "gray") {
		const bg = mode(`gray.100`, `whiteAlpha.200`)(props);

		return {
			bg,
			_hover: {
				bg: mode(`gray.200`, `whiteAlpha.300`)(props),
				_disabled: {
					bg,
				},
			},
			_active: { bg: mode(`gray.300`, `whiteAlpha.400`)(props) },
		};
	}

	const {
		bg = `${c}.500`,
		color = "white",
		hoverBg = `${c}.600`,
		activeBg = `${c}.700`,
	} = accessibleColorMap[c] ?? {};

	const background = mode(bg, `${c}.200`)(props);

	if (c === "hexmain") {
		return {
			bg: background,
			color: mode("hexhighligth.100", `gray.800`)(props),
			_hover: {
				bg: mode(hoverBg, `${c}.300`)(props),
				_disabled: {
					bg: background,
				},
			},
			_active: { bg: mode(activeBg, `${c}.400`)(props) },
		};
	}

	return {
		bg: background,
		color: mode(color, `gray.800`)(props),
		_hover: {
			bg: mode(hoverBg, `${c}.300`)(props),
			_disabled: {
				bg: background,
			},
		},
		_active: { bg: mode(activeBg, `${c}.400`)(props) },
	};
});

const variants = {
	solid: variantSolid,
};

const sizes = {
	lg: defineStyle({
		h: "12",
		minW: "12",
		fontSize: "lg",
		px: "6",
	}),
	md: defineStyle({
		h: "10",
		minW: "10",
		fontSize: "md",
		px: "4",
	}),
	sm: defineStyle({
		h: "8",
		minW: "8",
		fontSize: "sm",
		px: "3",
	}),
	xs: defineStyle({
		h: "6",
		minW: "6",
		fontSize: "xs",
		px: "2",
	}),
};

const Button = defineStyleConfig({
	variants,
	baseStyle,
	sizes,
	defaultProps: {
		variant: "solid",
		size: "md",
		colorScheme: "hexmain",
	},
});

export default Button;
