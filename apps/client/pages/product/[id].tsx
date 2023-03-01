import { useUser } from "@/src/context/UserContext";
import { Product } from "@/src/interface/product";
import { useCurrencyFormat } from "@/src/utils/CurrencyFormat";
import { Box, Button, Divider, Grid, HStack, Image, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import { TbTruckDelivery } from "react-icons/tb";

export default function Page({ data, app }: { data: Product, app?: any }) {
  const formatter = useCurrencyFormat();
  const { actions } = useUser();
  const [quantity, setQuantity] = useState(1);
  const handleQuantityChange = (value: number) => {
    if (value > data.quantity) setQuantity(quantity);
    setQuantity(value);
  };
  if (!data) return <div>Product not found</div>
  return <Stack p="6">
    <div itemScope itemType="http://schema.org/Product">
      {data.brand ? <meta itemProp="brand" content={data.brand} /> : null}
      <meta itemProp="name" content={data.title} />
      {/* <meta itemProp="description" content={data.description} /> */}
      <meta itemProp="productID" content={data.id} />
      <meta itemProp="url" content={`https://${app.host}/product/` + data.id} />
      <meta itemProp="image" content={data.image} />
      <meta itemProp="availability" content="available for order" />
    </div>
    <Head>
      <title>{data.title} | {app?.title}</title>
      <meta property="og:type" content="og:product" />
      <meta property="og:title" content={data.title} />
      <meta property="og:image" content={data.image} />
      <meta property="og:image" content={data.image} />
      <meta property="og:description" content={data.description} />
      <meta property="product:price:amount" content={data.price.toString()} />
      <meta property="product:price:currency" content="MNT" />
    </Head>
    <Grid gap={3} templateColumns={{
      base: "repeat(1, 1fr)",
      md: "repeat(2, 1fr)",
    }}>
      <Stack p="6" boxShadow={"md"} borderRadius="20px">
        <Image w="100%" src={data?.image} />
        {/* <Wrap w="100%">
          <Image src={data.image} w="45px" />
          <Image src={data.image} w="45px" />
          <Image src={data.image} w="45px" />
          <Image src={data.image} w="45px" />
          <Image src={data.image} w="45px" />
          <Image src={data.image} w="45px" />
          <Image src={data.image} w="45px" />
        </Wrap> */}
      </Stack>
      <Stack h="100%" boxShadow={"md"} borderRadius="20px" p="3">
        <Box h="80%">
          <Text fontSize={"2xl"}>
            {data?.title}
          </Text>
          <Divider />
          <Stack>
            <HStack mt={6}>
              <Text color="primary.500" textAlign={"center"} fontSize={"xl"} fontWeight={"bold"}>
                {formatter(data.price)}
              </Text>
              <Text
                color="gray.500"
                fontSize="sm"
                fontWeight="bold"
                textTransform="uppercase"
                textDecoration={"line-through"}
              >
                {formatter(data.oldPrice || 0)}
              </Text>
            </HStack>
            <Text color="gray" mt="3" dangerouslySetInnerHTML={{
              __html: data.description || ""
            }} />
            <HStack>
              <Text fontWeight={"bold"}>Агуулахад үлдсэн:</Text>
              <Text> {data.quantity}</Text>
            </HStack>
            <HStack>
              <TbTruckDelivery />
              <Text fontSize={"11px"} fontStyle={"italic"}>Хотын А бүс доторх хүргэлт: </Text>
              <Text fontWeight={"bold"} color="primary.400">ҮНЭГҮЙ</Text>
            </HStack>
          </Stack>
        </Box>
        <HStack>
          <Box>
            <NumberInput
              value={quantity}
              max={data.quantity}
              min={1}
              onChange={(value) => handleQuantityChange(+value)}
              // keepWithinRange={false}
              clampValueOnBlur={false}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>
          <Button display={{
            base: "none",
            md: "block"
          }}
            colorScheme={"primary"}
            onClick={() => actions?.addToBasket(data, quantity)}
          >
            Сагсанд нэмэх
          </Button>
        </HStack>
      </Stack>
    </Grid>
    <Stack spacing={0} w="100%">
      {data.images.map(el => <Image alt={el.id} key={el.id} src={el.image} />)}
    </Stack>
    <Box bg="gray.200" zIndex={2} p="3" position={"fixed"} w="100%" h="90px" bottom="0" left="0" display={{
      base: "block",
      md: "none"
    }}>
      <Button
        onClick={() => actions?.addToBasket(data, quantity)}
        w="100%" colorScheme={"green"}>
        Сагсанд нэмэх
      </Button>
    </Box>
  </Stack>
}

export async function getServerSideProps(context: any) {
  const { id } = context.query;
  const app = await axios({
    method: "get",
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    url: "/init"
  }).then(res => res.data).catch(e => ({
    title: "Undermaintain",
    description: "Sorry, we are undermaintain, please try again later."
  }));
  const { data } = await axios({
    method: "GET",
    url: process.env.NEXT_PUBLIC_API_URL + "/product/" + id,
  }).catch((e) => {
    return {
      data: null
    }
  });

  if (context.req) {
    app.host = context.req.headers.host;
  }
  return {
    props: {
      data,
      app
    },
  };
}
