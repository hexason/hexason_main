import { Box, Button, Center, Grid, HStack, Image, Input, Select, Stack, Textarea } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import ColorPicker from "../utils/ColorPicker";

export default function ProductDetail({ id }: { id: string }) {
  const [product, setProduct] = useState<any>(null);
  const [bgColor, setBgColor] = useState("");

  useEffect(() => {
    if (!id) return;
    axios({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      method: "get",
      url: "product/" + id
    })
      .then(({ data }) => setProduct(data))
      .catch(e => console.log(e))
  }, [id]);


  if (!product) return <Box>...</Box>
  return (
    <Stack>
      <Grid templateColumns={"repeat(2, 1fr)"} gap={3}>
        <Stack>
          <Stack borderRadius={"20px"} border="1px solid #000" bg={bgColor} p={6}>
            <Image borderRadius={"20px"} src={product.image} alt={product.title} />
            <Center>
              <ColorPicker value={bgColor} onChange={(value: string) => setBgColor(value)} />
            </Center>
          </Stack>
          <Input value={product.title} />
          <Textarea value={product.description} />
          <Input value={product.brand} />
          <Input value={product.price} />
          <Input value={product.discount} />
        </Stack>
        <Stack>
          <Select value={product.status}>
            <option value={"active"}>Active</option>
          </Select>
          <Box>
            {JSON.stringify(product.items)}
            {JSON.stringify(product.images)}
            {JSON.stringify(product.category)}
            {JSON.stringify(product.options)}
          </Box>
        </Stack>
      </Grid>
      <HStack flexDirection={"row-reverse"} p={3}>
        <Button colorScheme="green">Update</Button>
      </HStack>
    </Stack>
  )
}