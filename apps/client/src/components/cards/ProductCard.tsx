import { useCurrencyFormat } from "@/hooks/userCurrencyFormatter";
import { AspectRatio, Box, HStack, Stack, Text } from "@chakra-ui/react";
import { Blurhash } from 'react-blurhash';
import Image from "next/image"
import Link from "next/link";
export default function ProductCard({ product }: any) {
  const formatter = useCurrencyFormat();

  return (
    <Stack
      w="100%"
      borderRadius="20px"
      overflow={"hidden"}
      p={3}
      cursor={"pointer"}
      as={Link}
      href={"/shop/" + product.id}
      _hover={{
        bg: "#000",
        boxShadow: "0 19px 39px 0 rgba(255,255,255,0.2)"
      }}
    >
      <AspectRatio position={"relative"} ratio={1} borderRadius={"20px"} overflow={"hidden"}>
        <Box position={"absolute"} w="100%">
          <Blurhash
            hash="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
            width={400}
            height={300}
            resolutionX={32}
            resolutionY={32}
            punch={1}
          />
          <Image
            src={product.image}
            alt={product.title}
            blurDataURL="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?20170503175831"
            loading="lazy"
            placeholder="blur"
            fill
            style={{
              objectFit: "cover",
              transition: "0.5s"
            }}
          />
        </Box>
      </AspectRatio>
      <Text h="70px" overflow={"hidden"} fontSize={["1rem", "1.5rem"]}>{product.title}</Text>
      <HStack>
        {product.price ? <Text color="teal" fontSize={"1.2rem"}>
          {formatter(product.price, "short")}
          <Text as={"span"} fontSize={'0.8rem'}>₮</Text>
        </Text> : null}
        <Text fontSize={"0.8rem"} opacity={["0", "0.5"]}>{formatter(product.sold, "short")} зарагдсан</Text>
      </HStack>
    </Stack>
  )
}