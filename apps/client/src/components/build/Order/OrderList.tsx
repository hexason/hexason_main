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
  Tag,
  Tooltip,
} from "@chakra-ui/react";
import Link from "next/link";

export const OrderList = ({ data }: { data: { getOrders: Order[] } }) => {
  const formatter = useCurrencyFormat();
  return (
    <Stack>
      {data.getOrders.map((order) => (
        <Stack key={order.id}>
          <HStack justifyContent={"space-between"}>
            <HStack>
              <Box fontWeight={"bold"}>{order.shortId}</Box>
              <StatusViewer statusIndicator={order.status} />
            </HStack>
            <Box>
              {new Date(+order.createdAt)
                .toISOString()
                .replace("T", " ")
                .replace(/\..*/, "")}
            </Box>
            <Stack spacing={0}>
              <PaymentModalButton>Төлөх</PaymentModalButton>
              <Tag>{formatter(order.totalPrice, "standard")}</Tag>
            </Stack>
          </HStack>
          <Stack pl={6}>
            {order.goods.map((good) => (
              <HStack justifyContent={"space-between"} key={good.id}>
                <Link href={`/shop/${good.productId}`}>
                  <Image h={"100px"} src={good.productImage} />
                </Link>
                <Box>
                  {JSON.parse(good.productDetail).map((conf: any) => (
                    <HStack key={conf.configId}>
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
                </Box>
                <Box>{good.productTitle.substring(0, 25)}</Box>
                <Box>{formatter(good.productPrice, "standard")}</Box>
                <Box>{good.productQuantity}</Box>
                <Box>{formatter(good.totalPrice, "standard")}</Box>
              </HStack>
            ))}
          </Stack>
          <Divider h="1px" bg="black" />
        </Stack>
      ))}
    </Stack>
  );
};
