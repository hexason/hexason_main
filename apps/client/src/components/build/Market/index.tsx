"use client"
import { ProductCard } from "@/components/core";
import { getProducts } from "@/lib/Services";
import { ContainerStyle } from "@/theme/common"
import { Container, Grid } from "@chakra-ui/react"
import { useQuery } from "@apollo/client";
import { ThreeDotsWave } from "@/components/animation";

export const MarketPlace = () => {
  const { loading, data } = useQuery(getProducts);

  if (loading) return <ThreeDotsWave />
  return (
    <Container maxW="container.xl" {...ContainerStyle} p={3} minH="60vh">
      <Grid
        templateColumns={["repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(5, 1fr)"]}
        gap={6}
      >
        {data?.getProducts.items.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
    </Container>
  )
}