"use client"
import { Order } from "@/lib/types"
import { TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot, Image, Button, Stack } from "@chakra-ui/react"

export const OrderList = ({ data }: { data: { getOrders: Order[] } }) => {
  return (
    <TableContainer>
      <Table variant='striped' colorScheme='teal'>
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th>Захиалгын дугаар</Th>
            <Th>Нийт барааны үнэ</Th>
            <Th>Хүргэлтийн үнэ</Th>
            <Th isNumeric>Нийт төлбөр</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.getOrders.map((order) => <Tr key={order.id}>
            <Td>{order.shortId}</Td>
            {/* <Td>{order.paymentStatus}</Td> */}
            {/* <Td>{order.status}</Td> */}
            <Td>{order.totalProductPrice}</Td>
            <Td>{order.totalDeliveryPrice}</Td>
            <Td isNumeric>{order.totalPrice}</Td>
            <Td>
              <Stack>
                <Button float={"right"}>Бараанууд</Button>
                <Button float={"right"}>Төлбөр хийх</Button>
              </Stack>
            </Td>
          </Tr>)}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  )
}