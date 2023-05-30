import { Flex, Stack, Text } from "@chakra-ui/react";
import { SubCategory, CategoryItem } from "./type";

const SubCategory = ({ data }: { data: SubCategory }) => {
	return (
		<Stack spacing={1}>
			<Text variant="title2">{data.name}</Text>
			<Flex gap={4}>
				{data.CategoryItems.map((e) => (
					<CategoryItem key={e.id} data={e} />
				))}
			</Flex>
		</Stack>
	);
};

const CategoryItem = ({ data }: { data: CategoryItem }) => {
	return <Text variant="body2Alpha">{data.name}</Text>;
};

export default SubCategory;
