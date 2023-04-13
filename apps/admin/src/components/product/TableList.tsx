import { Button, Checkbox, HStack, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Table, TableContainer, Tag, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ProductDetail from "./ProductDetail";
import { useAxios } from "@/hooks/useAxios";
import DefaultAnimate from "../animation/DefaultAnimate";
import ThreeDotsWave from "../animation/ThreeDotsWave";

export default function TableList() {
  const [products, setProducts] = useState<any>([]);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [checkedProducts, setCheckProducts] = useState<string[]>([]);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const axios = useAxios();

  const checkAllProducts = (checked: boolean) => {
    if (checked) setCheckProducts(products.map((el: any) => el.id));
    else setCheckProducts([]);
  }

  const checkProduct = (id: string, checked: boolean) => {
    if (checked) setCheckProducts(prev => [...prev, id]);
    else setCheckProducts(prev => prev.filter(el => el !== id));
  }

  const selectProduct = (id: string) => {
    setSelectedProduct(id);
    onOpen();
  }

  useEffect(() => {
    axios({
      url: "product/list",
      method: "get"
    })
      .then(({ data }) => setProducts(data.items))
      .catch(e => {
        if (e.isPermission) setProducts(null)
      })
  }, [axios])

  if (!products) return <>No Permission</>

  return (
    <DefaultAnimate>
      {products.length === 0 ? <ThreeDotsWave /> :
        <DefaultAnimate>
          <TableContainer>
            <Table variant={"striped"} colorScheme="blackAlpha">
              <Thead>
                <Tr>
                  <Th>
                    <Checkbox isChecked={checkedProducts.length === products.length} onChange={(e) => checkAllProducts(e.target.checked)} />
                  </Th>
                  <Th>Title</Th>
                  <Th>Image</Th>
                  <Th>sold</Th>
                  <Th>quantity</Th>
                  <Th>status</Th>
                  <Th>action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {products.map((item: any) => <TableBodyRow isChecked={checkedProducts.includes(item.id)} key={item.id} data={item} actions={{ selectProduct, checkProduct }} />)}
              </Tbody>
            </Table>
          </TableContainer>
        </DefaultAnimate>
      }
      <Modal isOpen={isOpen} onClose={onClose} size={"4xl"}>
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
    </DefaultAnimate>
  )
}

const TableBodyRow = ({ data, actions, isChecked }: any) => {
  return (
    <Tr>
      <Td>
        <Checkbox isChecked={isChecked} onChange={e => actions.checkProduct(data.id, e.target.checked)} />
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