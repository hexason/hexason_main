import PaymentModal from "@/src/components/modals/PaymentModal";
import OrderItem from "@/src/components/other/OrderItem";
import { useModal } from "@/src/context/ModalContext";
import { useAxios } from "@/src/utils/axiosHook";
import { Accordion, AccordionItem, AccordionPanel, Box, Divider, Flex, Heading, HStack, Stack, Text, Image, Button, Tag } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
        <Stack>
          {orders.map((order: any) => <Order key={order.id} order={order} />)}
        </Stack>
      </Stack>
    </Box>
  )
}

const Order = ({ order }: any) => {
  const { onOpen, setChild } = useModal()

  const handleOpen = () => {
    setChild(<PaymentModal order={order} />)
    onOpen()
  }
  return (
    <Flex w="100%" justifyContent={"space-between"}>
      <HStack>
        <Box h="50px" w="50px">
          <Image objectFit={"cover"} src={order.items[0]?.product.image} />
        </Box>
        <Text display={["none", "block"]}>Захиалгын дугаар: </Text>
        <Stack spacing={0}>
          <Text fontWeight={"bold"}>{order.shortId}</Text>
        </Stack>
      </HStack>
      <HStack flexDirection={{ base: "column-reverse", md: "row" }} spacing={{base:0, md: 2}}>
        <Tag fontSize={"12px"}>{order.totalPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}₮</Tag>
        <Button colorScheme={"blue"} onClick={handleOpen}>
          Төлөх
        </Button>
        {/* <Tag colorScheme={"orange"}>{order.status}</Tag> */}
      </HStack>
    </Flex>
  )
}
