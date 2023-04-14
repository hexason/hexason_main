import { Badge, Box, Button, Center, Container, FormControl, FormLabel, Grid, Image, Input, Select, Stack, Tag, Textarea, Wrap } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import ColorPicker from "../utils/ColorPicker";
import ThreeDotsWave from "../animation/ThreeDotsWave";
import DefaultAnimate from "../animation/DefaultAnimate";

export default function ProductDetail({ id }: { id: string }) {
  const [product, setProduct] = useState<any>(null);
  const [bgColor, setBgColor] = useState("");

  const inputChanger = (e: any) => {
    setProduct((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }
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
      <Stack spacing={4} p={3} as={DefaultAnimate}>
        <Grid templateColumns={"repeat(2, 1fr)"} gap={3}>
          <Stack>
            <Stack borderRadius={"20px"} border="1px solid #000" bg={bgColor} p={6}>
              <Image borderRadius={"20px"} src={product.image} alt={product.title} />
              <Center>
                <ColorPicker value={bgColor} onChange={(value: string) => setBgColor(value)} />
              </Center>
            </Stack>
            <CustomFormControl title={"Brand"}>
              <Input value={product.brand} name="brand" onChange={inputChanger} />
            </CustomFormControl>
            <CustomFormControl title={"Status"}>
              <Select value={product.status} onChange={(value) => inputChanger({ target: { name: "status", value } })}>
                <option value={"active"}>Active</option>
              </Select>
            </CustomFormControl>
          </Stack>
          <Stack>
            <CustomFormControl title={"Title"}>
              <Input value={product.title} name="title" onChange={inputChanger} />
            </CustomFormControl>
            <CustomFormControl title={"Description"}>
              <Textarea value={product.description} name="description" onChange={inputChanger} />
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
              </Stack>
            </CustomFormControl>
            <CustomFormControl title={"General Options"}>
              {product.options.map((e: any) => (
                <Box key={e._id}>
                  <Tag>{e.configName}:{e.value}</Tag>
                </Box>
              ))}
            </CustomFormControl>
            <CustomFormControl title={"Picture description"}>
              <Wrap>
                {product.images.map((e: any) => (
                  <Image key={e._id} h="50px" src={e.url} />
                ))}
              </Wrap>
            </CustomFormControl>
          </Stack>
        </Grid>
        <CustomFormControl title={"SKU items"}>
          {product.items.map((e: any) => (
            <Box key={e.id}>
              {e.altTxt}
            </Box>
          ))}
        </CustomFormControl>
        <Button colorScheme="green" w="100%">Save</Button>
      </Stack>
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