import ProductCard from "@/components/cards/ProductCard";
import { useAxios } from "@/hooks/useAxios";
import { Container, Grid } from "@chakra-ui/react";
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
    <Container maxW="container.xl" p={0}>
      <Grid templateColumns={["repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(5, 1fr)"]} gap={6}>
        {products.map((product: any) => <ProductCard key={product.id} product={product} />)}
      </Grid>
    </Container>
  )
}