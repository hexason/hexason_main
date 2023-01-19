import { Box, Button, ChakraProps, Flex, Image, Text } from "@chakra-ui/react";
import { useCurrencyFormat } from "../../utils/CurrencyFormat";

export type CardProps = {
  id: string;
  title: string;
  image: string;
  description: string;
  price: number;
  salePrice?: number;
  trigger: () => void;
}

export default function Card({data, ...props}: {data: CardProps} & ChakraProps) {
  const format = useCurrencyFormat();

  return (
    <Box className="card" position={"relative"} height={"300px"} w={"300px"} borderRadius={"20px"} overflow="hidden" {...props}>
      <Box zIndex={1} position={"absolute"} w="100%" h="100%" background={"linear-gradient(0deg, rgba(7,23,0) 2%, rgba(0,0,0,0.5) 29%, rgba(0,212,255,0.19091386554621848) 100%)"}></Box>
      <Box h="100%" w="100%" overflow={"hidden"} position={"absolute"}>
        <Image height={"320px"} src="https://cdn.midjourney.com/7f800228-9afc-4016-b31d-519c17942a8b/grid_0.png" />
      </Box>
      <Box w="100%" p="10px" bottom={"10px"} color={"white"} zIndex={2} position={"absolute"}>
        <Text className="content" overflow={"scroll"} height={"10px"} visibility="hidden">{data.description}</Text>
        <Text textAlign={"center"}>{data.title}</Text>
        <Flex justifyContent={"space-between"}>
          <Text>{format(data.salePrice ? data.salePrice : data.price)}</Text>
          <Button colorScheme={"green"} onClick={data.trigger}>Buy Now</Button>
        </Flex>
      </Box>
    </Box>
  )
}