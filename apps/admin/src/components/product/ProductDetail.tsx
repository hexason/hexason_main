import { Badge, Box, Button, Center, Container, FormControl, FormLabel, Grid, Image, Input, Select, Stack, Tag, Textarea } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import ColorPicker from "../utils/ColorPicker";
import ThreeDotsWave from "../animation/ThreeDotsWave";
import DefaultAnimate from "../animation/DefaultAnimate";

export default function ProductDetail({ id }: { id: string }) {
  const [product, setProduct] = useState<any>(null);
  const [bgColor, setBgColor] = useState("");

  const categoryRemove = (id: string) => {
    if (!product) return;
    setProduct((prev: any) => ({
      ...prev,
      category: prev.category.filter((e: any) => e.id !== id)
    }))

  }
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


  if (!product) return <ThreeDotsWave />
  return (
    <Container maxW="container.lg">
      <DefaultAnimate>
        <Grid templateColumns={"repeat(2, 1fr)"} gap={3}>
          <Stack>
            <Stack borderRadius={"20px"} border="1px solid #000" bg={bgColor} p={6}>
              <Image borderRadius={"20px"} src={product.image} alt={product.title} />
              <Center>
                <ColorPicker value={bgColor} onChange={(value: string) => setBgColor(value)} />
              </Center>
            </Stack>
            <CustomFormControl title={"Title"}>
              <Input value={product.title} />
            </CustomFormControl>
            <CustomFormControl title={"Description"}>
              <Textarea value={product.description} />
            </CustomFormControl>
            <CustomFormControl title={"Brand"}>
              <Input value={product.brand} />
            </CustomFormControl>
          </Stack>
          <Stack>
            <CustomFormControl title={"Price"}>
              <Input value={product.price} />
            </CustomFormControl>
            <CustomFormControl title={"Discount"}>
              <Input value={product.discount} />
            </CustomFormControl>
            <CustomFormControl title={"Status"}>
              <Select value={product.status}>
                <option value={"active"}>Active</option>
              </Select>
            </CustomFormControl>
            <CustomFormControl title={"Category"}>
              <Stack>
                <Box>
                  {product.category.map((e: any) => (
                    <Tag cursor={"pointer"} key={e.id} onClick={() => categoryRemove(e.id)}>
                      {e.name} <Badge colorScheme="red">X</Badge>
                    </Tag>
                  ))}
                </Box>
                <Box>
                  <Button float={"right"} colorScheme="blackAlpha">Save</Button>
                </Box>
              </Stack>
            </CustomFormControl>
            <CustomFormControl title={"SKU items"}>
              {product.items.map((e: any) => (
                <Box key={e.id}>
                  {e.altTxt}
                </Box>
              ))}
            </CustomFormControl>
            <CustomFormControl title={"Picture description"}>
              {product.images.map((e: any) => (
                <Box key={e.url}>
                  {e.url}
                </Box>
              ))}
            </CustomFormControl>
            <CustomFormControl title={"General Options"}>
              {product.options.map((e: any) => (
                <Box key={e}>
                  {e}
                </Box>
              ))}
            </CustomFormControl>
          </Stack>
        </Grid>
      </DefaultAnimate>
    </Container>
  )
}

const CustomFormControl = ({ children, title }: any) => {
  return (
    <FormControl bg="#00000050" p={3} borderRadius={"20px"}>
      <FormLabel color="gray.400">{title}</FormLabel>
      {children}
    </FormControl>
  )
}