import { Button, Checkbox, HStack, Image, Table, TableContainer, Tag, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function TableList() {
  const [products, setProducts] = useState<any>([]);

  useEffect(() => {
    axios({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      url: "product/list",
      method: "get"
    })
      .then(({ data }) => setProducts(data.items))
      .catch(e => console.log(e))
  }, [])

  return (
    <TableContainer>
      <Table variant={"striped"} colorScheme="blackAlpha">
        <Thead>
          <TableHeaderRow />
        </Thead>
        <Tbody>
          {products.map((item: any) => <TableBodyRow key={item.id} data={item} />)}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

const TableHeaderRow = () => {
  return (
    <Tr>
      <Th></Th>
      <Th>Title</Th>
      <Th>Image</Th>
      <Th>sold</Th>
      <Th>quantity</Th>
      <Th>status</Th>
      <Th>action</Th>
    </Tr>
  )
}

const TableBodyRow = ({ data }: any) => {
  return (
    <Tr>
      <Td>
        <Checkbox />
      </Td>
      <Td>
        {data.title}
      </Td>
      <Td>
        <Image alt={data.title} src={data.image} h="75px" />
      </Td>
      <Td>{data.sold}</Td>
      <Td>{data.quantity}</Td>
      <Td>
        <Tag colorScheme="green">
          {data.status}
        </Tag>
      </Td>
      <Td>
        <HStack>
          <Button colorScheme="blue">v</Button>
          <Button colorScheme="red">x</Button>
        </HStack>
      </Td>
    </Tr>
  )
}