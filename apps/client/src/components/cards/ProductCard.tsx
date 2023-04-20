import { useCurrencyFormat } from "@/hooks/userCurrencyFormatter";
import { AspectRatio, HStack, Image, Stack, Text } from "@chakra-ui/react";

export default function ProductCard() {
  const formatter = useCurrencyFormat()
  return (
    <Stack
      w="100%"
      borderRadius="20px"
      overflow={"hidden"}
      p={3}
      cursor={"pointer"}
      _hover={{
        bg: "#000",
        boxShadow: "0 19px 39px 0 rgba(255,255,255,0.2)"
      }}
    >
      <AspectRatio ratio={1} borderRadius={"20px"} overflow={"hidden"}>
        <Image src="https://gw.alicdn.com/bao/uploaded/i4/2213340882873/O1CN01XAAdyw1X5sezAipNl_!!2213340882873.jpg_220x10000Q75.jpg_.webp" w="100%" h="100%" bg="#fff" />
      </AspectRatio>
      <Text h="70px" overflow={"hidden"} fontSize={["1rem", "1.5rem"]}>{`Brand special price large size 2023 summer new ladies slippers outerwear fashion flip flops medium heel thick heel sandals women's shoes`}</Text>
      <HStack>
        <Text color="teal" fontSize={"1.2rem"}>
          {formatter(200000, "short")}
          <Text as={"span"} fontSize={'0.8rem'}>₮</Text>
        </Text>
        <Text fontSize={"0.8rem"} opacity={["0", "0.5"]}>{formatter(10000, "short")} зарагдсан</Text>
      </HStack>
    </Stack>
  )
}