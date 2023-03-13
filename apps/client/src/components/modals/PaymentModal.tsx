import { Stack, Heading, Divider, Text, Box, Tag } from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import OrderItem from "../other/OrderItem";

export default function PaymentModal({ order }: any) {
  const [bank, setBank] = useState({
    "bank.name": "",
    "bank.account": "",
    "bank.reciver": ""
  });
  useEffect(() => {
    axios({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      url: "/info/bank",
      method: "get"
    }).then((response) => {
      setBank(response.data)
    }).catch(console.log)
  }, [])
  return (
    <Stack spacing={3}>
      <Heading>Төлбөр төлөх</Heading>
      <Divider />
      <Tag colorScheme={"orange"} p={3}>Таны захиалга төлбөр төлөгдсөнөөс хойш 24 цагийн дотор батаалгаажина.</Tag>
      <Box>
        <Text>Захиалгын дугаар: <Text as={"span"} fontWeight={"bold"}> {order.shortId}</Text> </Text>
        <Text>Төлөх дүн: <Text as={"span"} fontWeight={"bold"}> {order.totalPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}₮</Text> </Text>
      </Box>
      <Divider />
      <Box>
        <Text>Банк:  <Text as={"span"} fontWeight={"bold"}> {bank["bank.name"]}</Text></Text>
        <Text>Дансны дугаар: <Text as={"span"} fontWeight={"bold"}> {bank["bank.account"]}</Text></Text>
        <Text>Хүлээн авагч: <Text as={"span"} fontWeight={"bold"}> {bank["bank.reciver"]}</Text></Text>
      </Box>

      <Divider />
      <Stack>
        <Text fontWeight={"bold"}>Барааны мэдээлэл</Text>
        {order.items.map((item: any) => <OrderItem key={item.id} item={item} />)}
      </Stack>
    </Stack>
  )
}