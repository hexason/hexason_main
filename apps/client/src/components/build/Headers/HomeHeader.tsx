"use client";
import ProductCategory from "@/components/core/ProductCategory";
import { UserSidePage } from "@/components/core/SidePage/UserSidePage";
import { ContainerStyle } from "@/theme/common";
import { Grid, GridItem } from "@chakra-ui/react";

export default function HomeHeader() {
	return (
		<Grid h="400px" templateColumns={"repeat(8, 1fr)"} gap={6}>
			<GridItem {...ContainerStyle} colSpan={6}>
				<ProductCategory />
			</GridItem>
			<GridItem {...ContainerStyle} colSpan={2}>
				<UserSidePage />
			</GridItem>
		</Grid>
	);
}
