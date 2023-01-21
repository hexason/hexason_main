import { Container, Center, Grid } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Card from '../src/components/Other/Card'
import Hero from '../src/components/Other/Hero'
import axios from "axios"

export default function Home() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://cubezet-hfnf.vercel.app/product',
    }).then(({data}) => {
      setProducts(data.map((product:any) => {
        return {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          description: product.description,
          salePrice: product.salePrice,
          sold: product.sold,
        }
      }));
    })

  }, [])
  return (
    <>
      <Container mt="10px" minW="100%">
        <Hero />
        <Center>
          <Grid w="100%" templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]} gap={6}>
            {products.map((item:any) => <Card w={"100%"} key={item.id} data={item} />)}
          </Grid>
        </Center>
      </Container>
    </>
  )
}