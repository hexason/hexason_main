import { useUser } from "@/src/context/UserContext";
import { Product } from "@/src/interface/product";
import { useCurrencyFormat } from "@/src/utils/CurrencyFormat";
import { Box, Button, Divider, Grid, HStack, Image, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

export default function Page({ data }: { data: Product }) {
  const formatter = useCurrencyFormat();
  const { actions } = useUser();
  const [quantity, setQuantity] = useState(1);
  const handleQuantityChange = (value: number) => {
    if (value > data.quantity) setQuantity(quantity);
    setQuantity(value);
  };
  if (!data) return <div>Product not found</div>
  return <Stack p="6">
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
          <Text mt="3" dangerouslySetInnerHTML={{
            __html: data.description || ""
          }} />
        </Box>
        <HStack>
          <Text color="green" textAlign={"center"} fontSize={"xl"} fontWeight={"bold"}>
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
  const { data } = await axios({
    method: "GET",
    url: process.env.NEXT_PUBLIC_API_URL + "/product/" + id,
  }).catch((e) => {
    return {
      data: null
    }
  });
  return {
    props: {
      data,
    },
  };
}
