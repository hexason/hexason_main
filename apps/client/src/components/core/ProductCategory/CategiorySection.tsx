import { Box, Stack } from "@chakra-ui/react";
import { testCategories } from "./mocks";
import { ContainerStyle } from "@/theme/common";
import { useState } from "react";
import SubCategory from "./Category";

const CategiorySection = () => {
	const [isHover, setHover] = useState(false);
	const [isOuterHover, setOuterHover] = useState(false);
	const MouseIn = () => {
		setHover(true);
	};
	const MouseOut = () => {
		setHover(false);
	};

	const OuterMouseIn = () => {
		setOuterHover(true);
	};
	const OuterMouseOut = () => {
		setOuterHover(false);
	};

	return (
		<Box
			onMouseEnter={MouseIn}
			onMouseLeave={MouseOut}
			position="relative"
			h="414px"
			overflow={isHover ? "visible" : "hidden"}
		>
			<Box
				pos="absolute"
				w={isOuterHover ? "600px" : "250px"}
				zIndex={100}
				{...(() => (isHover ? ContainerStyle : {}))()}
			>
				<Stack w="250px" p={4} pr={0} spacing={0}>
					{testCategories.map((e) => (
						<SubCategory
							setOuterIn={OuterMouseIn}
							setOuterOut={OuterMouseOut}
							key={e.id}
							data={e}
						/>
					))}
				</Stack>
			</Box>
		</Box>
	);
};

export default CategiorySection;
