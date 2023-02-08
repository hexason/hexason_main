import { Box, Center, Grid } from "@chakra-ui/react";
import { useUser } from "../../context/UserContext";
import Card from "../Other/Card";

export default function Products() {
  const { products } = useUser();

  return (
    <Box>
      <Center>
        <Grid w="100%" templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]} gap={6}>
          {products.map((item: any) => <Card w={"100%"} key={item.product.id} data={{...item.product, sold:0}} isLoaded={true} />)}
        </Grid>
      </Center>
    </Box>
  )
}
