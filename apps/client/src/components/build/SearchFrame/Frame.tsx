"use client";
import { ThreeDotsWave } from "@/components/animation";
import { ProductCard } from "@/components/core";
import { searchProducts } from "@/lib/Services";
import { useQuery } from "@apollo/client";
import { Box, Grid } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
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
	const searchParams = useSearchParams().get("s");
	const [page, setPage] = useState(0);
	const [total, setTotal] = useState(1);
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
		if (data?.searchProducts.items)
			if (limit) {
				const ids = products.map((e: any) => e.id);
				const newProds = data.searchProducts.items.filter(
					(e: any) => !ids.includes(e.id)
				);
				setTotal(data.searchProducts.count);
				setProducts((prev: any) => [...prev, ...newProds]);
			} else {
				setProducts(data.searchProducts.items);
				setTotal(data.searchProducts.count);
			}
	}, [data]);

	useEffect(() => {
		setProducts([]);
		setPage(0);
	}, [searchParams]);

	const loadMoreItems = async () => {
		if (!limit) return;
		if (loading) return;
		setPage((prev) => prev + 1);
	};

	useEffect(() => {
		refetch();
	}, [page]);

	if (!infinite) {
		if (loading) return <ThreeDotsWave />;
		return (
			<>
				<Grid templateColumns={"repeat(5, 1fr)"}>
					{products.map((product: any) => (
						<ProductCard key={product.id} product={product} />
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
				scrollThreshold="200px"
				hasMore={products.length % limit! === 0}
				loader={<ThreeDotsWave />}
			>
				<Grid
					templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(5, 1fr)" }}
				>
					{products.map((product: any) => (
						<ProductCard key={product.id} product={product} />
					))}
				</Grid>
				{products.length === 0 && <>Бараа олдсонгүй</>}
			</InfiniteScroll>
		</Box>
	);
};
