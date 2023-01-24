import { Modal, ModalHeader, ModalCloseButton, ModalBody, ModalContent, ModalFooter, useClipboard } from "@chakra-ui/react"
import { useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { useCurrencyFormat } from "../../utils/CurrencyFormat"

export default function DefaulModal({ isOpen, onClose, children, title }: any) {
  const { setValue } = useClipboard("");
  const { wallet } = useUser();

  useEffect(() => {
    setValue(wallet.address);
  }, [])
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>{title || ""}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {children}
        </ModalBody>
        <ModalFooter>
          {/* <p>Modal Footer</p> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}