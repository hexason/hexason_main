"use client";
import { ThreeDotsWave } from "@/components/animation";
import { ProductCard } from "@/components/core";
import { ContainerStyle } from "@/theme/common";
import { gql, useQuery } from "@apollo/client";
import { Container, Grid, Tag } from "@chakra-ui/react";

export default function ProductList() {
	const { loading, data } = useQuery(gql`
		{
			getProducts {
				items {
					id
					title
					price
					sold
					image
				}
			}
		}
	`);

	if (loading)
		return (
			<Container
				my={4}
				maxW="container.xl"
				{...ContainerStyle}
				p={3}
				minH="60vh"
			>
				<ThreeDotsWave />
			</Container>
		);

	return (
		<Container my={4} maxW="container.xl" {...ContainerStyle} p={3} minH="60vh">
			<Tag colorScheme="green" my={3} fontSize={"1.2rem"} fontWeight={"bold"}>
				Шинэ бүтээгдэхүүн
			</Tag>
			<Grid
				templateColumns={["repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(5, 1fr)"]}
				gap={6}
			>
				{data?.getProducts.items.map((product: any) => (
					<ProductCard key={product.id} product={product} />
				))}
			</Grid>
		</Container>
	);
}
