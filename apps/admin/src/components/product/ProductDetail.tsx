import { Badge, Box, Button, Center, Container, FormControl, FormLabel, Grid, Image, Input, Select, Stack, Tag, Textarea, Wrap, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ColorPicker from "../utils/ColorPicker";
import ThreeDotsWave from "../animation/ThreeDotsWave";
import DefaultAnimate from "../animation/DefaultAnimate";
import { useAxios } from "@/hooks/useAxios";
import { CategoryCreator } from "../category";
import FileUploader from "../core/File/FileUploader";

export default function ProductDetail({ id }: { id: string }) {
  const [product, setProduct] = useState<any>(null);
  const [bgColor, setBgColor] = useState("");
  const [loading, setLoading] = useState(false);
  const axios = useAxios();
  const toast = useToast();

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
  const categoryAdd = (data: any) => {
    setProduct((prev: any) => ({ ...prev, category: [...prev.category, data] }))
  }
  useEffect(() => {
    if (!id) return;
    setLoading(true)
    axios({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      method: "get",
      url: "product/" + id
    })
      .then(({ data }) => {
        setBgColor(data.bgColor)
        setProduct(data)
      })
      .catch(e => console.log(e))
      .finally(() => setLoading(false))
  }, [id, axios]);

  const saveProduct = async () => {
    setLoading(true)
    await axios({
      method: "put",
      url: `product/${id}/info`,
      data: {
        title: product.title,
        description: product.description,
        bgColor,
        image: product.image,
        brand: product.brand,
        images: product.images,
        options: product.options,
        category: product.category.map((e: any) => e.id)
      }
    }).then(() => {
      toast({
        title: "Successfully",
        status: "success",
        description: "Saved successfully",
        isClosable: true,
        duration: 5000
      })
    }).catch((e) => {
      toast({
        title: "Error",
        status: "error",
        description: e.response ? e.response.data.message : e.message,
        isClosable: true,
        duration: 5000
      })
    })
    setLoading(false);
  }


  if (!product) return <ThreeDotsWave />
  return (
    <Container maxW="container.lg">
      <Stack spacing={4} p={3} as={DefaultAnimate}>
        <Grid templateColumns={"repeat(2, 1fr)"} gap={3}>
          <Stack>
            <Stack borderRadius={"20px"} border="1px solid #000" bg={bgColor} p={6}>
              <FileUploader src={product.image} onChange={(url: string) => setProduct({ ...product, image: url })} />
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
                <Wrap>
                  {product.category.map((e: any) => (
                    <Tag cursor={"pointer"} key={e.id} onClick={() => categoryRemove(e.id)}>
                      {e.name} <Badge colorScheme="red">X</Badge>
                    </Tag>
                  ))}
                  <CategoryCreator trigger={categoryAdd} />
                </Wrap>
              </Stack>
            </CustomFormControl>
            {/* <CustomFormControl title={"General Options"}>
              {product.options.map((e: any) => (
                <Box key={e._id}>
                  <Tag>{e.configName}:{e.value}</Tag>
                </Box>
              ))}
            </CustomFormControl> */}
            <CustomFormControl title={"Picture description"}>
              <Wrap>
                {product.images.map((e: any) => (
                  <Image key={e._id} h="50px" src={e.url} alt={e._id + "-picture"} />
                ))}
                <Button colorScheme="blackAlpha">+</Button>
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
        <Button isLoading={loading} onClick={saveProduct} colorScheme="green" w="100%">Save</Button>
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