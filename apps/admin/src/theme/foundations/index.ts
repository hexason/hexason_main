import colors from "./colors";
import radius from "./radius";
import shadows from "./shadows";
import spacing from "./spacing";
import typography from "./typography";

const foundations = {
	radius,
	colors,
	...typography,
	shadows,
	space: spacing,
};

export default foundations;
