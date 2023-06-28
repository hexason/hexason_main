import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  HStack,
  ChakraProps,
} from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { PaymentBody } from "./PaymentBody";

export function PaymentModalButton({
  children,
  orderId,
  price,
  ...props
}: ChakraProps & PropsWithChildren & {
  orderId: string,
  price: number
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button {...props} onClick={onOpen}>
        {children}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Төлбөрийн хуудас</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <PaymentBody orderId={orderId} price={price} />
          </ModalBody>
          <ModalFooter>
            <HStack w="100%" justifyContent={"center"} alignItems={"center"}>
              {/* <Button onClick={onClose}>ШАЛГАХ</Button> */}
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

