import { Modal, ModalHeader, ModalCloseButton, ModalBody, ModalContent, ModalFooter, useClipboard } from "@chakra-ui/react"
import { useEffect } from "react";
import { useUser } from "../../context/UserContext";

export default function DefaulModal({ isOpen, onClose, children, title, ...props }: any) {
  const { setValue } = useClipboard("");
  const { wallet } = useUser();

  useEffect(() => {
    setValue(wallet.address);
  }, [])
  return (
    <Modal isOpen={isOpen} onClose={onClose} {...props}>
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