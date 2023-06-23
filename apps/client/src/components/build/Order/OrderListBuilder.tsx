"use client"
import { Box } from "@chakra-ui/react"
import { OrderList } from "./OrderList"
import { OrderListMobile } from "./OrderListMobile"
import { Order } from "@/lib/types"

export const OrderListBuilder = ({ data }: { data: { getOrders: Order[] } }) => {
  return (
    <>
      <Box w="100%" display={{ base: "none", md: "flex" }}>
        <OrderList data={data} />
      </Box>
      <Box w="100%" display={{ base: "flex", md: "none" }}>
        <OrderListMobile data={data} />
      </Box>
    </>
  )
}