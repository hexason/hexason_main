"use client"
import { ThreeDotsWave } from "@/components/animation";
import { ProductCard } from "@/components/core"
import { getProducts } from "@/lib/Services";
import { useQuery } from "@apollo/client";
import { Grid } from "@chakra-ui/react"

export const Frame = () => {
  const { loading, data } = useQuery(getProducts);

  if (loading) return <ThreeDotsWave />
  return (
    <Grid templateColumns={"repeat(5, 1fr)"}>
      {data?.getProducts.items.slice(0, 5).map((product: any) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  )
}