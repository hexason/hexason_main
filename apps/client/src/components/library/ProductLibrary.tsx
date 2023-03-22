import { Product } from "@/src/interface/product";
import { useAxios } from "@/src/utils/axiosHook";
import { Box, Grid, Heading, Skeleton, Stack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import ProductCard from "../other/ProductCard";

export default function ProductLibrary() {
  const [products, setProducts] = useState<Product[]>([]);
  const { loaded, fetch } = useAxios<{ count: 0, items: Product[] }>("/product", {}, "get");

  useEffect(() => {
    fetch().then((data) => setProducts(data.items));
  }, []);
  
  return (
    <Stack>
      <Heading>Цахим дэлгүүр</Heading>
      <Grid w="100%" templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]} gap={6}>
        {
          loaded ? products.map((item: any) => <ProductCard w={"100%"} key={item.id} data={item} />) : [1, 2, 3, 4, 5, 6].map((_, i) => <Skeleton className="fade-out" key={"s" + i}>
            <Box w="100%" h="400px">
            </Box>
          </Skeleton>
          )}
      </Grid>
    </Stack>
  )
}