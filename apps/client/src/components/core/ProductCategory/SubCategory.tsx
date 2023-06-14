import { Flex, Stack, Text } from "@chakra-ui/react";
import { CategoryItem } from "./type";

const SubCategory = ({ data }: { data: CategoryItem }) => {
	return (
		<Stack spacing={1}>
			<Text variant="title2" cursor="pointer">
				{data.title}
			</Text>
			{data.children ? (
				<Flex gap={4}>
					{data.children.map((e) => (
						<CategoryItem key={e.id} data={e} />
					))}
				</Flex>
			) : null}
		</Stack>
	);
};

const CategoryItem = ({ data }: { data: CategoryItem }) => {
	return (
		<Text variant="body2Alpha" cursor="pointer">
			{data.title}
		</Text>
	);
};

export default SubCategory;
