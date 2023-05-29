import { Box, GridItem, SimpleGrid } from "@chakra-ui/react";
import Highlight from "./Highlight";
import { HighlightCard, HomeHighlightType } from "./type";
import CategiorySection from "./CategiorySection";

const array: Array<HighlightCard> = [
	{
		id: 1,
		name: "Element 1",
		imgUrl: "https://picsum.photos/300",
	},
	{
		id: 2,
		name: "Element 2",
		imgUrl: "https://picsum.photos/300",
	},
	{
		id: 3,
		name: "Element 3",
		imgUrl: "https://picsum.photos/300",
	},
	{
		id: 4,
		name: "Element 4",
		imgUrl: "https://picsum.photos/300",
	},
	{
		id: 5,
		name: "Element 5",
		imgUrl: "https://picsum.photos/300",
	},
];

const Test1: HomeHighlightType = {
	name1: "Test1",
	name2: "Test1-2",
	color: "red",
	size: 2,
	data: array,
};

const Test2: HomeHighlightType = {
	name1: "Test2",
	name2: "Test2-2",
	color: "red",
	size: 5,
	data: array,
};

const ProductCategory = () => {
	return (
		<SimpleGrid columns={7}>
			<GridItem colSpan={2}>
				<CategiorySection />
			</GridItem>
			<GridItem p={4} colSpan={5}>
				<SimpleGrid columns={2} spacing={4}>
					<GridItem>
						<Highlight data={Test1} />
					</GridItem>
					<GridItem>
						<Highlight data={Test1} />
					</GridItem>
					<GridItem colSpan={2}>
						<Highlight data={Test2} />
					</GridItem>
				</SimpleGrid>
			</GridItem>
		</SimpleGrid>
	);
};

export default ProductCategory;
