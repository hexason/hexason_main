import { Button, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";

export default function WarningModal() {
  const { onOpen, onClose, isOpen } = useDisclosure();

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_AGE_RESTRICTION === "true") {
      const answer = localStorage.getItem("iamadult")
      if (answer != "yes") onOpen();
    }
  }, []);

  const accept = () => {
    localStorage.setItem("iamadult", "yes")
    onClose()
  }

  const reject = () => {
    window.close()
  }

  return (
    <Modal onClose={reject} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader bg="red">
          Анхааруулга
        </ModalHeader>
        <ModalBody>
          <Text>
            {'Насанд хүрэгчдэд зориулсан контент агуулагдсан тул зөвхөн 18-с дээш настай бол нэвтэрч орно уу!'}
          </Text>
        </ModalBody>
        <ModalFooter>
          <HStack justifyContent={"center"} w="100%">
            <Button onClick={accept} colorScheme={"green"}>БИ 18 ХҮРСЭН</Button>
            <Button onClick={reject} colorScheme={"red"}>ҮГҮЙ</Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}