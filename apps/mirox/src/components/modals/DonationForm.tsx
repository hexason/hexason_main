import { Stack, Text, Input, FormLabel, FormControl } from "@chakra-ui/react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useClipboard,
  useToast
} from '@chakra-ui/react'

export default function DonationForm({ isOpen, onClose }: { isOpen: boolean, onClose: () => any }) {
  const toast = useToast();
  const address = useClipboard('0x8d3DcAe6fEFcCB1966941c09F9d9385d492e4fC1')
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Donate for Mirox Forest</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack>
            <Text textAlign={"center"} color="gray.400">{'Thank You for your kindly assistance. We give you xpass to Donation Address'}</Text>
            <Stack p={3} border="1px solid #0000005A" borderRadius={"20px"}>
              <FormControl>
                <FormLabel>{'USDT, ETH, MATIC, BNB'}</FormLabel>
                <Input readOnly value={address.value} onClick={() => {
                  address.onCopy();
                  toast({
                    title: "Success",
                    status: "success",
                    description: "Copied " + address.value,
                    duration: 2500,
                    isClosable: true
                  })
                }}></Input>
              </FormControl>
            </Stack>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button variant='ghost' onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>

  );
}