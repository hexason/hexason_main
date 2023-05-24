"use client"
import { ProductCard } from "@/components/core";
import { useAxios } from "@/hooks/useAxios";
import { Container, Grid, Tag } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const axios = useAxios();

  useEffect(() => {
    axios.get('/product/list').then(res => {
      setProducts(res.data.items);
    });
  }, [])
  return (
    <Container my={4} maxW="container.xl" bg="white" borderRadius={"20px"} p={3} minH="60vh">
      <Tag
        colorScheme="green"
        my={3}
        fontSize={"1.2rem"}
        fontWeight={"bold"}
      >Шинэ бүтээгдэхүүн</Tag>
      <Grid templateColumns={["repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(5, 1fr)"]} gap={6}>
        {products.map((product: any) => <ProductCard key={product.id} product={product} />)}
      </Grid>
    </Container>
  )
}