import { Button, Center, Container, FormControl, FormLabel, Input, Stack, Textarea, useToast } from "@chakra-ui/react";
import { useState } from "react"
import { useAxios } from "@/hooks/useAxios";
import { ImageUploadManyType, FileUploader, FileUploaderMany } from "@/components/core";
import { ColorPicker } from "@/components/core/other";

export default function ProductCreate({ trigger }: { trigger?: (id: string) => any }) {
  const [product, setProduct] = useState({
    title: "",
    description: "test e2e",
    bgColor: '#000',
    brand: "Supertest",
    image: "https://www.nursafia.my/image/nursafia/image/data/all_product_images/product-1482/test-product-copy_1655771197.jpeg",
    images: [
      { url: "https://www.nursafia.my/image/nursafia/image/data/all_product_images/product-1482/test-product-copy_1655771197.jpeg" },
    ],
  });
  const [bgColor, setBgColor] = useState("");
  const [loading, setLoading] = useState(false);
  const axios = useAxios();
  const toast = useToast();

  const saveProduct = async () => {
    setLoading(true)
    await axios({
      method: "post",
      url: `product/create`,
      data: {
        title: product.title,
        description: product.description,
        bgColor,
        image: product.image,
        brand: product.brand,
        images: product.images,
      }
    }).then(({ data }) => {
      toast({
        title: "Successfully",
        status: "success",
        description: "Saved successfully",
        isClosable: true,
        duration: 5000
      });
      if (trigger) trigger(data._id);
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

  return (
    <Container maxW="500px">
      <Stack>
        <Stack borderRadius={"20px"} border="1px solid #000" bg={bgColor} p={6}>
          <FileUploader src={product.image} onChange={(url: string) => setProduct({ ...product, image: url })} />
          <Center>
            <ColorPicker value={bgColor} onChange={(value: string) => setBgColor(value)} />
          </Center>
        </Stack>
        <CustomFormControl title={"Title"}>
          <Input value={product.title} name="title" onChange={inputChanger} />
        </CustomFormControl>
        <CustomFormControl title={"Brand"}>
          <Input value={product.brand} name="brand" onChange={inputChanger} />
        </CustomFormControl>
        <CustomFormControl title={"Description"}>
          <Textarea value={product.description} name="description" onChange={inputChanger} />
        </CustomFormControl>
        <CustomFormControl title={"Picture description"}>
          <FileUploaderMany imgs={product.images.map((e: any) => ({ name: e._id, url: e.url, isUploaded: true }))} onChange={imagesDescriptionChanger} />
        </CustomFormControl>
        <Button onClick={saveProduct} isLoading={loading} colorScheme="whiteAlpha">Save</Button>
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