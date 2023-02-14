import { useModal } from "@/src/context/ModalContext";
import { useAxios } from "@/src/utils/axiosHook";
import { useCurrencyFormat } from "@/src/utils/CurrencyFormat";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Divider, Flex, Heading, HStack, Stack, Tag, Text, Image, Grid, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useUser } from "../../src/context/UserContext";

export default function User() {
  const { user, loading } = useUser();
  const [orders, setOrders] = useState([]);
  const router = useRouter();
  const { fetch } = useAxios("/user/orders", { page: 1, limit: 10 }, "get");

  useEffect(() => {
    if (loading) return;
    if (!user) router.replace("/");

    fetch().then((res) => {
      setOrders(res);

      console.log(res);
    });
  }, [user]);
  if (loading) return <Box>Loading...</Box>

  return (
    <Box p={6}>
      <Stack spacing={4}>
        <Heading>Таны захиалга</Heading>
        <Divider />
        <Box>
          <Accordion allowToggle defaultIndex={[0]}>
            {orders.map((order: any) => <Order key={order.id} order={order} />)}
          </Accordion>
        </Box>
      </Stack>
    </Box>
  )
}

const Order = ({ order }: any) => {
  const { onOpen, setChild } = useModal()
  const openPaymentModal = (order: any) => {
    setChild(<PaymentModal order={order} />)
    onOpen();
  }

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Flex w="100%" justifyContent={"space-between"}>
            <HStack>
              <Text display={["none", "block"]}>Захиалгын дугаар: </Text>
              <Text fontWeight={"bold"}>{order.id}</Text>
            </HStack>
            <Tag colorScheme={"orange"}>{order.status}</Tag>
          </Flex>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Stack spacing={5}>
         { order.status === "pending" ? <Button w="100%" colorScheme={"blue"} onClick={() => openPaymentModal(order)}>Төлөх {`(${order.totalPrice}₮)`}</Button> : null}
          {order.items.map((item: any) => <OrderItem key={item.id} item={item} />)}
        </Stack>
      </AccordionPanel>
    </AccordionItem>
  )
}

const OrderItem = ({ item }: any) => {
  return (
    <Grid borderBottom={"1px solid gray"} templateColumns={["repeat(1,1fr)", "repeat(3,1fr)"]} gap="5">
      <Image w="100%" src={item.product.image} />
      <Stack>
        <Box>Үнэ: {item.totalPrice}</Box>
        <Box>Тоо ширхэг: {item.quantity}</Box>
        <Box>Төлөв: {item.status}</Box>
        {/* <Button colorScheme={"red"} onClick={() => { }}><FaTrash /> ХАСАХ</Button> */}
      </Stack>
      <Box>
        <Text>{item.description}</Text>
      </Box>
    </Grid>
  )
}

const PaymentModal = ({ order }: any) => {
  const format = useCurrencyFormat()
  return (<Box>
    <Heading>Банкаар шилжүүлэх</Heading>
    <Text>Захиалгын дугаар: {order.id}</Text>
    <Divider my="3" />
    <Text>
      Банк: <Text fontWeight={"bold"} as="span">Голомт</Text>
    </Text>
    <Text>Хүлээн авагч: <Text as="span" fontWeight={"bold"}>Чингүн</Text></Text>
    <Text>Шилжүүлэх дүн:<Text as="span" fontWeight={"bold"}>{format(order.totalPrice)}</Text></Text>
    <Text>Утга:<Text as="span" fontWeight={"bold"}> hex{order.id}</Text> </Text>
  </Box>)
}