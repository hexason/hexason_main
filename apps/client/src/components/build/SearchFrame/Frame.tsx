"use client";
import { ThreeDotsWave } from "@/components/animation";
import { ProductCard } from "@/components/core";
import { searchProducts } from "@/lib/Services";
import { useQuery } from "@apollo/client";
import { Box, Grid } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export const Frame = ({
	query,
	provider,
	limit,
	infinite,
}: {
	query: string;
	provider: string;
	limit?: number;
	infinite?: boolean;
}) => {
	const [page, setPage] = useState(0);
	const [products, setProducts] = useState<any>([]);
	const { loading, data, refetch } = useQuery(searchProducts, {
		variables: {
			data: {
				page: page,
				limit: limit || 5,
				provider,
				query,
			},
		},
	});
	useEffect(() => {
		console.log("data===>", data);
		if (data?.searchProducts.items)
			if (limit) {
				setProducts((prev: any) => [...prev, ...data?.searchProducts.items]);
			} else {
				setProducts(data?.searchProducts.items);
			}
	}, [data]);

	const loadMoreItems = async () => {
		if (!limit) return;
		if (loading) return;
		setPage((prev) => prev + 1);
		refetch();
	};

	if (!infinite) {
		if (loading) return <ThreeDotsWave />;
		return (
			<>
				<Grid templateColumns={"repeat(5, 1fr)"}>
					{products.map((product: any) => (
						<ProductCard key={product.id + Date.now()} product={product} />
					))}
				</Grid>
				{products.length === 0 && <>Бараа олдсонгүй</>}
			</>
		);
	}
	return (
		<Box minH={"100vh"}>
			<InfiniteScroll
				dataLength={products.length}
				next={loadMoreItems}
				refreshFunction={loadMoreItems}
				pullDownToRefresh
				pullDownToRefreshThreshold={100}
				hasMore={limit ? true : false}
				loader={<ThreeDotsWave />}
			>
				<Grid
					templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(5, 1fr)" }}
				>
					{products.map((product: any) => (
						<ProductCard key={product.id + Date.now()} product={product} />
					))}
				</Grid>
				{products.length === 0 && <>Бараа олдсонгүй</>}
			</InfiniteScroll>
		</Box>
	);
};
