"use client";
import { PaymentModalButton } from "@/components/core";
import { useCurrencyFormat } from "@/hooks";
import { Order } from "@/lib/types";
import { Box, HStack, Image, Stack, Text } from "@chakra-ui/react";

export const OrderListMobile = ({ data }: { data: { getOrders: Order[] } }) => {
  const formatter = useCurrencyFormat();
  return (
    <Stack>
      {data.getOrders.map((order) => (
        <Stack key={order.id}>
          <Text>{order.shortId}</Text>
          <Stack>
            {order.goods.map((good) => (
              <HStack key={good.id}>
                <Image src={good.productImage} h="100px" />
                <Stack pr={8} w="100%">
                  <HStack alignItems={"center"}>
                    <Text>Барааны үнэ</Text>
                    <Text>{formatter(good.productPrice, "standard")}</Text>
                  </HStack>
                  <HStack alignItems={"center"}>
                    <Text>Тоо ширхэг</Text>
                    <Text>{good.productQuantity}</Text>
                  </HStack>
                  <PaymentModalButton w="100%">Төлөх</PaymentModalButton>
                </Stack>
              </HStack>
            ))}
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
};
