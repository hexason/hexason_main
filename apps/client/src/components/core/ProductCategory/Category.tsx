import { Box, Stack, Text } from "@chakra-ui/react";
import { Category } from "./type";
import { useState } from "react";
import SubCategory from "./SubCategory";

const Category = ({
	data,
	setOuterIn,
	setOuterOut,
}: {
	data: Category;
	setOuterIn: () => void;
	setOuterOut: () => void;
}) => {
	console.log(data);
	const [isHover, setHover] = useState(false);
	const MouseIn = () => {
		setHover(true);
		setOuterIn();
	};
	const MouseOut = () => {
		setHover(false);
		setOuterOut();
	};
	return (
		<Box onMouseEnter={MouseIn} onMouseLeave={MouseOut} py={3}>
			<Text variant="title2">{data.name}</Text>
			{isHover ? (
				<Stack
					py={7}
					pos="absolute"
					top="0px"
					left="250px"
					right="0px"
					bottom="0px"
					spacing={6}
				>
					{data.SubCategories.map((e) => (
						<SubCategory key={e.id} data={e} />
					))}
				</Stack>
			) : null}
		</Box>
	);
};

export default Category;
