import {
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Image,
  Input,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { ColorPicker } from "@/components/core";

export default function ProductEdit({
  trigger,
}: {
  trigger?: (id: string) => any;
}) {
  const [product, setProduct] = useState({
    title: "",
    description: "test e2e",
    bgColor: "#000",
    brand: "Supertest",
    image:
      "https://www.nursafia.my/image/nursafia/image/data/all_product_images/product-1482/test-product-copy_1655771197.jpeg",
    images: [
      {
        url: "https://www.nursafia.my/image/nursafia/image/data/all_product_images/product-1482/test-product-copy_1655771197.jpeg",
      },
    ],
  });
  const [bgColor, setBgColor] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const saveProduct = async () => {
    setLoading(true);

    setLoading(false);
  };

  const inputChanger = (e: any) => {
    setProduct((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Container maxW="500px">
      <Stack>
        <Stack borderRadius={"20px"} border="1px solid #000" bg={bgColor} p={6}>
          <Image src={product.image} />
          <Center>
            <ColorPicker
              value={bgColor}
              onChange={(value: string) => setBgColor(value)}
            />
          </Center>
        </Stack>
        <CustomFormControl title={"Title"}>
          <Input value={product.title} name="title" onChange={inputChanger} />
        </CustomFormControl>
        <CustomFormControl title={"Brand"}>
          <Input value={product.brand} name="brand" onChange={inputChanger} />
        </CustomFormControl>
        <CustomFormControl title={"Description"}>
          <Textarea
            value={product.description}
            name="description"
            onChange={inputChanger}
          />
        </CustomFormControl>
        <CustomFormControl title={"Picture description"}>
          {/* Picutres component here */}
        </CustomFormControl>
        <Button
          onClick={saveProduct}
          isLoading={loading}
          colorScheme="whiteAlpha"
        >
          Save
        </Button>
      </Stack>
    </Container>
  );
}
const CustomFormControl = ({ children, title }: any) => {
  return (
    <FormControl>
      <FormLabel>{title}</FormLabel>
      {children}
    </FormControl>
  );
};
