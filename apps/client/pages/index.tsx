import { Container, Center, Grid } from '@chakra-ui/react'
import { useState } from 'react'
import Card from '@/components/other/Card'

export default function Home() {
  const [products] = useState([])

  return (
    <>
      <Container mt="10px" minW="100%">
        {/* <Hero /> */}
        <Center>
          <Grid w="100%" templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]} gap={6}>
            {
              products.map((item: any) => <Card w={"100%"} key={item.id} data={item} />)
            }
          </Grid>
        </Center>
      </Container>
    </>
  )
}