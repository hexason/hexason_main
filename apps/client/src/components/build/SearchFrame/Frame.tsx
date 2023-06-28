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
  infinite
}: {
  query: string;
  provider: string;
  limit?: number
  infinite?: boolean
}) => {
  const [page, setPage] = useState(0);
  const [products, setProducts] = useState<any>([]);
  const { loading, data, refetch } = useQuery(searchProducts, {
    variables: {
      data: {
        page: page || 0,
        limit: limit || 5,
        provider,
        query,
      },
    },
  });
  useEffect(() => {
    if (data?.searchProducts.items)
      setProducts((prev: any) => [...prev, ...data?.searchProducts.items]);
  }, [data]);

  const loadMoreItems = async () => {
    if (loading) return;
    setPage(prev => prev + 1);
    refetch()
  }

  if (!infinite) {
    if (loading) return <ThreeDotsWave />
    return (
      <Grid templateColumns={"repeat(5, 1fr)"}>
        {products.map((product: any) => (
          <ProductCard key={product.id + Date.now()} product={product} />
        ))}
      </Grid>
    )
  }
  return (
    <Box minH={"100vh"}>
      <InfiniteScroll
        dataLength={products.length}
        next={loadMoreItems}
        refreshFunction={loadMoreItems}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        hasMore={true}
        loader={<ThreeDotsWave />}
      >
        <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(5, 1fr)" }}>
          {products.map((product: any) => (
            <ProductCard key={product.id + Date.now()} product={product} />
          ))}
        </Grid>
      </InfiniteScroll>
    </Box>
  );
};