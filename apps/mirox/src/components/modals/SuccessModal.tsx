import { Center, Stack, Text } from "@chakra-ui/react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react'

export default function SuccessModal({ description, isOpen, onClose }: { description: string, isOpen: boolean, onClose: () => any }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack>
            <Center>
              <img width={"100px"} src={"https://cdn2.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2/128/check-circle-green-512.png"} alt="done" />
            </Center>
            <Text textAlign={"center"} color="gray.400">{description}</Text>
          </Stack>
        </ModalBody>
        <ModalFooter>
        </ModalFooter>
      </ModalContent>
    </Modal>

  );
}