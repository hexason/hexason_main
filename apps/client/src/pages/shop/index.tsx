import ProductCard from "@/components/cards/ProductCard";
import { Container, Grid } from "@chakra-ui/react";

export default function ShoppPage() {
  return (
    <Container maxW="container.xl" p={0}>
      <Grid templateColumns={["repeat(2, 1fr)", "repeat(3, 1fr)",  "repeat(5, 1fr)"]} gap={6}>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </Grid>
    </Container>
  )
}