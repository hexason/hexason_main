"use client";
import ProductCategory from "@/components/core/ProductCategory";
import { UserSidePage } from "@/components/core/SidePage/UserSidePage";
import { Grid, GridItem } from "@chakra-ui/react";

export default function HomeHeader() {
	return (
		<Grid h="400px" templateColumns={"repeat(8, 1fr)"} gap={6}>
			<GridItem bg="white" borderRadius={"20px"} colSpan={6}>
				<ProductCategory />
			</GridItem>
			<GridItem bg="white" borderRadius={"20px"} colSpan={2}>
				<UserSidePage />
			</GridItem>
		</Grid>
	);
}
