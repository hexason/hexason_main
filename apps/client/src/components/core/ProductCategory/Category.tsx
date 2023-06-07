import { Box, Stack, Text } from "@chakra-ui/react";
import { CategoryItem } from "./type";
import { useState } from "react";
import SubCategory from "./SubCategory";

const Category = ({
	data,
	setOuterIn,
	setOuterOut,
	setLocalHaveChild,
}: {
	data: CategoryItem;
	setOuterIn: () => void;
	setOuterOut: () => void;
	setLocalHaveChild: (flag: boolean) => void;
}) => {
	const [isHover, setHover] = useState(false);
	const MouseIn = () => {
		setHover(true);
		setOuterIn();
		setLocalHaveChild(Havechild());
	};
	const MouseOut = () => {
		setHover(false);
		setOuterOut();
		setLocalHaveChild(false);
	};

	const Havechild = () => {
		if (data.children) {
			if (data.children.length > 0) return true;
			else return false;
		} else return false;
	};
	return (
		<Box onMouseEnter={MouseIn} onMouseLeave={MouseOut} py={3}>
			<Text variant="title2" cursor="pointer">
				{data.title}
			</Text>
			{isHover && data.children && data.children.length ? (
				<Stack
					py={7}
					pos="absolute"
					top="0px"
					left="250px"
					right="0px"
					bottom="0px"
					spacing={6}
				>
					{data.children.map((e) => (
						<SubCategory key={e.id} data={e} />
					))}
				</Stack>
			) : null}
		</Box>
	);
};

export default Category;
