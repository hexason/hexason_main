import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Divider, Flex, Heading, HStack, Stack, Tag, Text, Image, Grid, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { useUser } from "../../src/context/UserContext";

export default function User() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) router.replace("/");
  }, [user]);
  if (loading) return <Box>Loading...</Box>

  return (
    <Box p={6}>
      <Stack spacing={4}>
        <Heading>Таны захиалга</Heading>
        <Divider />
        <Box>
          <Accordion allowToggle>
            <Order />
            <Order />
            <Order />
            <Order />
          </Accordion>
        </Box>
      </Stack>
    </Box>
  )
}

const Order = () => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Flex w="100%" justifyContent={"space-between"}>
            <HStack>
              <Text display={["none", "block"]}>Захиалгын дугаар: </Text>
              <Text fontWeight={"bold"}>ORD123</Text>
            </HStack>
            <Tag colorScheme={"orange"}>Хүлээгдэж байна</Tag>
          </Flex>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Stack spacing={5}>
          <Button w="100%" colorScheme={"blue"} onClick={() => { }}>Төлөх {"(10000₮)"}</Button>
          <OrderItem />
          <OrderItem />
          <OrderItem />
          <OrderItem />
        </Stack>
      </AccordionPanel>
    </AccordionItem>
  )
}

const OrderItem = () => {
  return (
    <Grid borderBottom={"1px solid gray"} templateColumns={["repeat(1,1fr)", "repeat(3,1fr)"]} gap="5">
      <Image w="100%" src="https://cdn.shopify.com/s/files/1/0014/2648/9388/products/ultra-tokyo-connection-pvc-scale-figures-chainsaw-man-power-prize-figure-32504714756140_360x.jpg?v=1669223937" alt="Segun Adebayo" />
      <Stack>
        <Box>Үнэ: 10</Box>
        <Box>Тоо ширхэг: 10</Box>
        <Box>Төлөв: 10</Box>
        <Button colorScheme={"red"} onClick={() => { }}><FaTrash /> ХАСАХ</Button>
      </Stack>
      <Box>
        <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad rem et voluptate fugit praesentium nobis magnam, debitis cum iure, quis illo. Cum, temporibus ut ipsam architecto eos dolores quod doloremque.</Text>
      </Box>
    </Grid>
  )
}