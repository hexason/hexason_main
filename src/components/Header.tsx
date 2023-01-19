import { Box, Container } from "@chakra-ui/react";

import Navbar from "./Navbar";
import Card from "./Other/Card";

export default function Header() {
  return (
    <Box
      minH={"100vh"}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
    >
      <Navbar />
      <Container maxW="container.fill">
        {data.map((item) => <Card key={item.id} data={item} />)}
      </Container>
    </Box>
  )
}

const data = [
  {
    id: "1",
    title: "CUBEZET",
    image: "https://cdn.midjourney.com/7f800228-9afc-4016-b31d-519c17942a8b/grid_0.png",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nisl nisl aliquet nisl, eget aliquam nisl lorem quis nisl. Sed euismod, nunc ut aliquam aliquam, nisl nisl aliquet nisl, eget aliquam nisl lorem quis nisl. lorem m quis nisl. Sed euismod, nunc ut aliquam aliquam, nisl nisl aliquet nisl, eget aliquam nisl lorem quis nisl. lorem m quis nisl. Sed euismod, nunc ut aliquam aliquam, nisl nisl aliquet nisl, eget aliquam nisl lorem quis nisl. lorem m quis nisl. Sed euismod, nunc ut aliquam aliquam, nisl nisl aliquet nisl, eget aliquam nisl lorem quis nisl. lorem m quis nisl. Sed euismod, nunc ut aliquam aliquam, nisl nisl aliquet nisl, eget aliquam nisl lorem quis nisl. lorem ",
    price: 3200,
    salePrice: 1000,
    trigger: () => alert("Added to cart"),
  }
]