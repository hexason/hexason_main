import { Button, Checkbox, HStack, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Table, TableContainer, Tag, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductDetail from "./ProductDetail";

export default function TableList() {
  const [products, setProducts] = useState<any>([]);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const selectProduct = (id: string) => {
    setSelectedProduct(id);
    onOpen();
  }

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
    <>
      <TableContainer>
        <Table variant={"striped"} colorScheme="blackAlpha">
          <Thead>
            <TableHeaderRow />
          </Thead>
          <Tbody>
            {products.map((item: any) => <TableBodyRow key={item.id} data={item} actions={{ selectProduct }} />)}
          </Tbody>
        </Table>
      </TableContainer>
      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent bg="#28243D" color="gray.200">
          <ModalHeader>
            Product Detail
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            {selectedProduct ? <ProductDetail id={selectedProduct} /> : null}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
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

const TableBodyRow = ({ data, actions }: any) => {
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
        <Tag colorScheme={data.status === "active" ? "green" : "gray"}>
          {data.status}
        </Tag>
      </Td>
      <Td>
        <HStack>
          <Button colorScheme="blue" onClick={() => actions.selectProduct(data.id)}>v</Button>
        </HStack>
      </Td>
    </Tr>
  )
}