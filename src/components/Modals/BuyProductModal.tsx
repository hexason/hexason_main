import { Modal, ModalHeader, ModalCloseButton, ModalBody, ModalContent, ModalFooter, Input, Text, Center, InputGroup, InputLeftAddon, Divider, InputRightAddon, Button, Stack, useClipboard, HStack } from "@chakra-ui/react"
import { useEffect } from "react";
import { FaWallet } from "react-icons/fa"
import { useUser } from "../../context/UserContext";
import { useCurrencyFormat } from "../../utils/CurrencyFormat"

export default function BuyModal({ isOpen, onClose, children, price, title }: any) {
  const formatter = useCurrencyFormat();
  const { onCopy, value, setValue, hasCopied } = useClipboard("");
  const { wallet } = useUser();
  const { balance } = wallet;

  useEffect(() => {
    setValue("0x8d3DcAe6fEFcCB1966941c09F9d9385d492e4fC1")
  }, [])
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>{title || "Investment Card"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Center>
            <Stack spacing={"3px"}>
              <Center>
                <HStack>
                  <Text color="white" fontSize={"18px"}>Your balance: </Text>
                  <Text fontWeight={"bold"} color={balance >= price ? "green.600" : "red.600"}>{formatter(balance)}</Text>
                </HStack>
              </Center>
              {
                balance < price ?
                  <InputGroup>
                    <InputLeftAddon>
                      <FaWallet size={"20px"} />
                    </InputLeftAddon>
                    <Input readOnly value={value} />
                    <InputRightAddon onClick={onCopy} as={Button} bg={"green.600"}>
                      {hasCopied ? "Done" : "Copy"}
                    </InputRightAddon>
                  </InputGroup>
                  : <></>
              }
            </Stack>
          </Center>
          <Divider my={3} />
          {children}
        </ModalBody>
        <ModalFooter>
          {/* <p>Modal Footer</p> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}