import { Box, Center, Grid } from "@chakra-ui/react";
import Card from "../Other/Card";

export default function Products() {

  return (
    <Box>
      <Center>
        <Grid w="100%" templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]} gap={6}>
          {/* {data.map((item: any) => <Card w={"100%"} key={item.id} data={item} />)} */}
        </Grid>
      </Center>
    </Box>
  )
}
