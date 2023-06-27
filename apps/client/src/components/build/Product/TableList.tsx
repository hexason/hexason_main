"use client";
import {
  Box,
  Button,
  Checkbox,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { DefaultAnimate, ThreeDotsWave } from "@/components/animation";
import { motion } from "framer-motion";
import { EyeIcon, TrashIcon } from "@/assets/icons";
import { statusViewer } from "@/utils";
import ProductEdit from "./ProductEdit";
// import ProductCreate from "./ProductCreate";

export default function TableList({ products }: any) {
  // const [products, setProducts] = useState<any>([products]);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [checkedProducts, setCheckProducts] = useState<string[]>([]);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const creatorModal = useDisclosure();
  const [listener, refresh] = useState(0);

  const checkAllProducts = (checked: boolean) => {
    if (checked) setCheckProducts(products.map((el: any) => el.id));
    else setCheckProducts([]);
  };

  const checkProduct = (id: string, checked: boolean) => {
    if (checked) setCheckProducts((prev) => [...prev, id]);
    else setCheckProducts((prev) => prev.filter((el) => el !== id));
  };

  const selectProduct = (id: string) => {
    setSelectedProduct(id);
    onOpen();
  };

  useEffect(() => {}, [listener]);

  if (!products) return <>No Permission</>;
  return (
    <DefaultAnimate>
      {products.length === 0 ? (
        <ThreeDotsWave />
      ) : (
        <Box m={3} as={DefaultAnimate}>
          <Button onClick={creatorModal.onOpen} colorScheme="blackAlpha">
            Create Product
          </Button>
          <TableContainer h="80vh" overflowY="auto">
            <Table variant={"striped"} colorScheme="blackAlpha">
              <Thead>
                <Tr>
                  <Th>
                    <HStack>
                      <Checkbox
                        isChecked={checkedProducts.length === products.length}
                        onChange={(e) => checkAllProducts(e.target.checked)}
                      />
                      <Button
                        as={motion.button}
                        initial={{
                          opacity: checkedProducts.length > 0 ? 0 : 1,
                          rotate:
                            checkedProducts.length > 0 ? "360deg" : "0deg",
                        }}
                        animate={{
                          opacity: checkedProducts.length > 0 ? 1 : 0,
                          rotate:
                            checkedProducts.length > 0 ? "0deg" : "360deg",
                        }}
                        transition={{ duration: "0.5s" }}
                        colorScheme="red"
                        p={3}
                        onClick={() => setCheckProducts([])}
                      >
                        <TrashIcon height={20} fill={"white"} />
                      </Button>
                    </HStack>
                  </Th>
                  <Th>Id</Th>
                  <Th>Image</Th>
                  <Th>sold</Th>
                  <Th>quantity</Th>
                  <Th>status</Th>
                  <Th>action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {products.map((item: any) => (
                  <TableBodyRow
                    isChecked={checkedProducts.includes(item.id)}
                    key={item.id}
                    data={item}
                    actions={{ selectProduct, checkProduct }}
                  />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      )}

      <Modal
        isOpen={creatorModal.isOpen}
        onClose={() => {
          creatorModal.onClose();
          refresh(Date.now());
        }}
        size={"4xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Product Create
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <ProductEdit
              trigger={(id) => {
                creatorModal.onClose(), selectProduct(id);
              }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          refresh(Date.now());
        }}
        size={"4xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Product Detail
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            {/* {selectedProduct ? <ProductDetail id={selectedProduct} /> : null} */}
          </ModalBody>
        </ModalContent>
      </Modal>
    </DefaultAnimate>
  );
}

const TableBodyRow = ({ data, actions, isChecked }: any) => {
  return (
    <Tr>
      <Td>
        <Checkbox
          isChecked={isChecked}
          onChange={(e) => actions.checkProduct(data.id, e.target.checked)}
        />
      </Td>
      <Td>{data.id}</Td>
      <Td>
        <Image alt={data.title} src={data.image} h="75px" />
      </Td>
      <Td>{data.sold}</Td>
      <Td>{data.quantity}</Td>
      <Td>
        <Tag colorScheme={statusViewer(data.status).colorSchema}>
          {statusViewer(data.status).txt}
        </Tag>
      </Td>
      <Td>
        <HStack>
          <Button
            colorScheme="blackAlpha"
            onClick={() => actions.selectProduct(data.id)}
          >
            <EyeIcon height={30} fill={"white"} />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
};
