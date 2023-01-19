import { Container, Center, Grid } from '@chakra-ui/react'
import Card from '../src/components/Other/Card'
import Hero from '../src/components/Other/Hero'

export default function Home() {
  return (
    <>
      <Container mt="10px" minW="100%">
        <Hero />
        <Center>
          <Grid w="100%" templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]} gap={6}>
            {data.map((item) => <Card w={"100%"} key={item.id} data={item} />)}
            {data.map((item) => <Card w={"100%"} key={item.id} data={item} />)}
          </Grid>
        </Center>
      </Container>
    </>
  )
}

const data = [
  {
    id: "1",
    title: "CUBEZET",
    image: "https://cdn.midjourney.com/7f800228-9afc-4016-b31d-519c17942a8b/grid_0.png",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nisl nisl aliquet nisl, eget aliquam nisl lorem quis nisl. Sed euismod, nunc ut aliquam aliquam, nisl nisl aliquet nisl, eget aliquam nisl lorem quis nisl. lorem m quis nisl. Sed euismod, nunc ut aliquam aliquam, nisl nisl aliquet nisl, eget aliquam nisl lorem quis nisl. lorem m quis nisl. Sed euismod, nunc ut aliquam aliquam, nisl nisl aliquet nisl, eget aliquam nisl lorem quis nisl. lorem m quis nisl. Sed euismod, nunc ut aliquam aliquam, nisl nisl aliquet nisl, eget aliquam nisl lorem quis nisl. lorem m quis nisl. Sed euismod, nunc ut aliquam aliquam, nisl nisl aliquet nisl, eget aliquam nisl lorem quis nisl. lorem ",
    price: 3200,
    sold: 1000,
    salePrice: 1000,
    trigger: () => alert("Added to cart"),
  },
  {
    id: "2",
    title: "CUBEZET",
    image: "https://cdn.midjourney.com/7f800228-9afc-4016-b31d-519c17942a8b/grid_0.png",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nisl nisl aliquet nisl, eget aliquam nisl lorem quis nisl. Sed euismod, nunc ut aliquam aliquam, nisl nisl aliquet nisl, eget aliquam nisl lorem quis nisl. lorem m quis nisl. Sed euismod, nunc ut aliquam aliquam, nisl nisl aliquet nisl, eget aliquam nisl lorem quis nisl. lorem m quis nisl. Sed euismod, nunc ut aliquam aliquam, nisl nisl aliquet nisl, eget aliquam nisl lorem quis nisl. lorem m quis nisl. Sed euismod, nunc ut aliquam aliquam, nisl nisl aliquet nisl, eget aliquam nisl lorem quis nisl. lorem m quis nisl. Sed euismod, nunc ut aliquam aliquam, nisl nisl aliquet nisl, eget aliquam nisl lorem quis nisl. lorem ",
    price: 3200,
    salePrice: 1000,
    trigger: () => alert("Added to cart"),
  },
  {
    id: "3",
    title: "CUBEZET",
    image: "https://cdn.midjourney.com/7f800228-9afc-4016-b31d-519c17942a8b/grid_0.png",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nisl nisl aliquet nisl, eget aliquam nisl lorem quis nisl. Sed euismod, nunc ut aliquam aliquam, nisl nisl aliquet nisl, eget aliquam nisl lorem quis nisl. lorem m quis nisl. Sed euismod, nunc ut aliquam aliquam, nisl nisl aliquet nisl, eget aliquam nisl lorem quis nisl. lorem m quis nisl. Sed euismod, nunc ut aliquam aliquam, nisl nisl aliquet nisl, eget aliquam nisl lorem quis nisl. lorem m quis nisl. Sed euismod, nunc ut aliquam aliquam, nisl nisl aliquet nisl, eget aliquam nisl lorem quis nisl. lorem m quis nisl. Sed euismod, nunc ut aliquam aliquam, nisl nisl aliquet nisl, eget aliquam nisl lorem quis nisl. lorem ",
    price: 3200,
    salePrice: 1000,
    trigger: () => alert("Added to cart"),
  },
]