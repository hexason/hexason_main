"use client";
import { PaymentModalButton } from "@/components/core";
import { useCurrencyFormat } from "@/hooks";
import { Order } from "@/lib/types";
import { Badge, Divider, HStack, Image, Stack, Text } from "@chakra-ui/react";

export const OrderListMobile = ({ data }: { data: { getOrders: Order[] } }) => {
  const formatter = useCurrencyFormat();
  return (
    <Stack w="100%">
      {data.getOrders.map((order) => (
        <Stack key={order.id}>
          <HStack w="100%">
            <Badge colorScheme="hexmain">{order.shortId}</Badge>
            <Divider h="1px" bg="hexmain.600" />
          </HStack>
          <Stack>
            {order.goods.map((good) => (
              <HStack key={good.id}>
                <Image src={good.productImage} h="70px" />
                <Stack pr={8} w="100%">
                  <HStack alignItems={"center"}>
                    <Text>Барааны үнэ</Text>
                    <Badge>{formatter(good.productPrice, "standard")}</Badge>
                  </HStack>
                  <HStack alignItems={"center"}>
                    <Text>Тоо ширхэг</Text>
                    <Text>{good.productQuantity}</Text>
                  </HStack>
                  <PaymentModalButton orderId={order.shortId} price={order.totalPrice} w="100%">Төлөх</PaymentModalButton>
                </Stack>
              </HStack>
            ))}
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
};
