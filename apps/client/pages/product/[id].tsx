import { useUser } from "@/src/context/UserContext";
import { Product } from "@/src/interface/product";
import { useCurrencyFormat } from "@/src/utils/CurrencyFormat";
import { Box, Button, Divider, Grid, Image, Stack, Text } from "@chakra-ui/react";
import axios from "axios";

export default function Page({ data }: { data: Product }) {
  const formatter = useCurrencyFormat();
  const { actions } = useUser();
  if(!data) return <div>Product not found</div>
  return <Stack p="6">
    <Grid gap={3} templateColumns={{
      base: "repeat(1, 1fr)",
      md: "repeat(2, 1fr)",
    }}>
      <Box>
        <Image w="100%" src={data?.image} />
      </Box>
      <Stack h="100%">
        <Box h="80%">
          <Text>
            {data?.title}
          </Text>
          <Divider />
          <Box fontWeight={"bold"}>
            {formatter(data.price)}
          </Box>
          <Text dangerouslySetInnerHTML={{
            __html: data.description || ""
          }} />
        </Box>
        <Button display={{
          base: "none",
          md: "block"
        }}
          colorScheme={"primary"}
          onClick={() => actions?.addToBasket(data)}
        >
          Сагсанд нэмэх
        </Button>
      </Stack>
    </Grid>
    <Stack spacing={0} w="100%">
      <Image src={data?.image} />
      <Image src={data?.image} />
      <Image src={data?.image} />
      <Image src={data?.image} />
      <Image src={data?.image} />
      <Image src={data?.image} />
      <Image src={data?.image} />
    </Stack>
    <Box bg="gray.200" zIndex={2} p="3" position={"fixed"} w="100%" h="90px" bottom="0" left="0" display={{
      base: "block",
      md: "none"
    }}>
      <Button
        onClick={() => actions?.addToBasket(data)}
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