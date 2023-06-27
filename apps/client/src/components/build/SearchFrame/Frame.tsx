"use client"
import { ThreeDotsWave } from "@/components/animation";
import { ProductCard } from "@/components/core"
import { searchProducts } from "@/lib/Services";
import { useQuery } from "@apollo/client";
import { Grid } from "@chakra-ui/react"

export const Frame = ({ query, provider }: { query: string, provider: string }) => {
  const { loading, data } = useQuery(searchProducts, {
    variables: {
      data: {
        page: 0,
        limit: 5,
        provider,
        query
      }
    }
  });

  if (loading) return <ThreeDotsWave />
  return (
    <Grid templateColumns={"repeat(5, 1fr)"}>
      {data?.searchProducts.items.map((product: any) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  )
}