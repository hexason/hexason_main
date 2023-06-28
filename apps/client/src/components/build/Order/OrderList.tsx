"use client";
import { PaymentModalButton, StatusViewer } from "@/components/core";
import { useCurrencyFormat } from "@/hooks";
import { Order } from "@/lib/types";
import {
  Stack,
  HStack,
  Box,
  Image,
  Divider,
  Tooltip,
  Text,
  Badge,
} from "@chakra-ui/react";
import Link from "next/link";

export const OrderList = ({ data }: { data: { getOrders: Order[] } }) => {
  const formatter = useCurrencyFormat();
  return (
    <Stack w="100%">
      {data.getOrders.map((order) => (
        <Stack key={order.id}>
          <HStack justifyContent={"space-between"}>
            <HStack>
              <Box fontWeight={"bold"}>{order.shortId}</Box>
              <StatusViewer statusIndicator={order.status} />
            </HStack>
            <Box fontSize={"xs"} fontWeight={"bold"}>
              {new Date(+order.createdAt)
                .toISOString()
                .replace("T", " ")
                .replace(/\..*/, "")}
            </Box>
          </HStack>
          <Stack pl={6}>
            {order.goods.map((good) => (
              <HStack justifyContent={"space-between"} key={good.id}>
                <HStack>
                  <Link href={`/shop/${good.productId}`}>
                    <Image h={"100px"} src={good.productImage} />
                  </Link>
                  <Stack w="350px" overflow={"hidden"}>
                    {JSON.parse(good.productDetail).map((conf: any) => (
                      <HStack as={Badge} key={conf.configId}>
                        <Box>{conf.configName}:</Box>{" "}
                        {conf.icon ? (
                          <Tooltip label={conf.value}>
                            <Image h="25px" src={conf.icon} />
                          </Tooltip>
                        ) : (
                          <Box>{conf.value}</Box>
                        )}
                      </HStack>
                    ))}
                  </Stack>
                </HStack>
                <Stack alignItems={"center"}>
                  <Text>Барааны үнэ</Text>
                  <Text>{formatter(good.productPrice, "standard")}</Text>
                </Stack>
                <Stack alignItems={"center"}>
                  <Text>Тоо ширхэг</Text>
                  <Text>{good.productQuantity}</Text>
                </Stack>
                <Stack alignItems={"center"}>
                  <Box>{formatter(good.totalPrice, "standard")}</Box>
                  <PaymentModalButton orderId={order.shortId} price={order.totalPrice}>Төлөх</PaymentModalButton>
                </Stack>
              </HStack>
            ))}
          </Stack>
          <Divider h="1px" bg="black" />
        </Stack>
      ))}
    </Stack>
  );
};
