import { TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";

export default function Rooms({data}: any) {
  return (
    <TableContainer p={3} border="1px solid teal" borderRadius={"20px"}>
      <Table size="md" overflow="auto"  h={"400px"}>
        <TableCaption>Earn big, Play smart</TableCaption>
        <Thead>
          <Tr>
            <Th w="100px">Title</Th>
            <Th>Earn</Th>
            <Th display={["none", "block"]}>Wallet</Th>
            <Th>Color</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((room: any) => (
            <Tr p={3} cursor="pointer">
            <Td maxW={["90px","200px"]} maxH="60px" overflow={"hidden"}> jasldjalk jklasjdlkajsld jalkjd lakjl dkjalskdj lasjdlajsldjowqijhp oqh uwqh uh</Td>
            <Td>8$</Td>
            <Td display={["none", "block"]}>address</Td>
            <Td>test</Td>
          </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}