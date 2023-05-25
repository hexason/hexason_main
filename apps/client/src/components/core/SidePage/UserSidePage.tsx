import { useCurrencyFormat } from "@/hooks"
import { Avatar, Button, Divider, Grid, HStack, Image, Stack, Tag, Text } from "@chakra-ui/react"
import Link from "next/link"

const data = [
  {
    url: "/",
    src: "/icons/logistic.svg",
    text: "Хүргэлт, ложистик"
  },
  {
    url: "/",
    src: "/icons/online_payment.svg",
    text: "Төлбөрийн систем"
  },
  {
    url: "/shop",
    src: "/icons/tourist_map.svg",
    text: "Худалдаа, Заавар"
  }

]
export const UserSidePage = () => {
  const formatter = useCurrencyFormat()
  return (
    <Stack spacing={6} alignItems={"center"} p={3} h="100%">
      <Avatar />
      <Tag fontWeight={"bold"} p={3}>{formatter(1000, "short")}₮</Tag>
      <HStack>
        <Button colorScheme="green">Login</Button>
        <Button>Register</Button>
      </HStack>
      <Stack justifyContent={"end"} h="100%" w="100%">
        <Divider />
        <Text fontWeight={"bold"} textAlign={"start"} w="100%">Бусад</Text>
        <Grid gap={3} templateColumns={`repeat(${data.length},1fr)`} w="100%" alignItems={"start"}>
          {data.map((el) => <Link href={el.url} key={el.text}>
            <Image h="40px  " w="100%" src={el.src} />
            <Text fontSize={"14px"}>{el.text}</Text>
          </Link>)}
        </Grid>
      </Stack>
    </Stack>
  )
} 