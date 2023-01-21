import { Modal, ModalHeader, ModalCloseButton, ModalBody, ModalContent, ModalFooter } from "@chakra-ui/react"

export default function BuyModal({ isOpen, onClose, children }:any) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
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