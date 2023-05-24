import { Badge, Button, Center, Container, FormControl, FormLabel, Grid, Image, Input, Select, Stack, Table, TableContainer, Tag, Textarea, Th, Thead, Tr, Wrap, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAxios } from "@/hooks/useAxios";
import ItemDetail from "./ItemDetail";
import ItemCreate from "./ItemCreate";
import { ImageUploadManyType, ThreeDotsWave, DefaultAnimate, FileUploader, FileUploaderMany } from "@/components/core";
import { ColorPicker } from "@/components/core/other";
import { CategoryCreator } from "../category";
export default function ProductDetail({ id }: { id: string }) {
  const [product, setProduct] = useState<any>(null);
  const [bgColor, setBgColor] = useState("");
  const [loading, setLoading] = useState(false);
  const axios = useAxios();
  const toast = useToast();

  const imagesDescriptionChanger = (images: ImageUploadManyType[]) => {
    setProduct((prev: any) => {
      return {
        ...prev,
        images: images.map(e => ({ url: e.url }))
      }
    })
  }

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
        images: product.images.filter((img: any) => img.url),
        options: product.options,
        category: product.category.map((e: any) => e.id),
        status: parseInt(product.status)
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
              <Select name="status" value={product.status} onChange={(e) => inputChanger(e)}>
                <option value={12}>Active</option>
                <option value={0}>Pending</option>
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
              <FileUploaderMany imgs={product.images.map((e: any) => ({ name: e._id, url: e.url, isUploaded: true }))} onChange={imagesDescriptionChanger} />
            </CustomFormControl>
          </Stack>
        </Grid>
        <CustomFormControl title={"SKU items"}>
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>SKU</Th>
                  <Th>Variant</Th>
                  <Th>Price</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              {product.items.filter((e: any) => e.status === 12).map((e: any) => (
                <ItemDetail key={e.id} itemData={e} onChange={(datas: any) => setProduct({ ...product, items: datas })} />
              ))}
              <ItemCreate productId={product.id} onChange={(datas: any) => setProduct({ ...product, items: datas })} />
            </Table>
          </TableContainer>
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