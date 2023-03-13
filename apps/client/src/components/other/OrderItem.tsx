import { Grid, Stack, Box, Image, Text } from "@chakra-ui/react";

export default function OrderItem({ item }: any) {
  return (
    <Grid templateColumns={["repeat(3,1fr)"]} gap="5">
      <Image w="100%" src={item.product.image} />
      <Stack>
        <Box>Үнэ: {item.totalPrice}</Box>
        <Box>Тоо ширхэг: {item.quantity}</Box>
        <Box>Төлөв: {item.status}</Box>
        {/* <Button colorScheme={"red"} onClick={() => { }}><FaTrash /> ХАСАХ</Button> */}
      </Stack>
      <Box>
        <Text>{item.description}</Text>
      </Box>
    </Grid>
  )
}