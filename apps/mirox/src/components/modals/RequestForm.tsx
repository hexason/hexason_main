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
  useToast,
  useDisclosure
} from '@chakra-ui/react'
import { useState } from "react";
import SuccessModal from "./SuccessModal";
import { addDoc, collection } from "firebase/firestore";
import { firedb } from "@/lib/firebase";

export default function RequestForm({ isOpen, onClose }: { isOpen: boolean, onClose: () => any }) {
  const toast = useToast()
  const [inpt, setInpt] = useState<any>({});
  const successController = useDisclosure();
  const handleChanger = (e: any) => {
    setInpt((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }
  const handleSubmit = () => {
    if (!inpt['email']) {
      toast({
        status: 'warning',
        title: "Information Needed",
        isClosable: true,
        description: 'Email must important for back to contact you',
        duration: 2500
      });
      return;
    }
    if (!inpt['name']) {
      toast({
        status: 'warning',
        title: "Information Needed",
        isClosable: true,
        description: 'I need to know how should I call you.',
        duration: 2500
      });
      return;
    }
    if (!inpt['explain']) {
      toast({
        status: 'warning',
        title: "Information Needed",
        isClosable: true,
        description: 'It is important. I can match who is suitable for amazing work.',
        duration: 2500
      });
      return;
    }
    onClose();
    addDoc(collection(firedb, 'requests'), inpt);
    successController.onOpen();
  }
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Request AI Fox</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Text textAlign={"center"} color="gray.400">{'You can use our Fox for your customer service'}</Text>
              <Stack p={3} border="1px solid #0000005A" borderRadius={"20px"}>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input onChange={handleChanger} name={'email'} value={inpt['email']} placeholder="Email"></Input>
                </FormControl>
                <FormControl>
                  <FormLabel>Your Name</FormLabel>
                  <Input onChange={handleChanger} name={'name'} value={inpt['name']} placeholder="Your Name"></Input>
                </FormControl>
                <FormControl>
                  <FormLabel>Company</FormLabel>
                  <Input onChange={handleChanger} name={'company'} value={inpt['company']} placeholder="Company (optional)"></Input>
                </FormControl>
                <FormControl>
                  <FormLabel>AI use for?</FormLabel>
                  <Input onChange={handleChanger} name={'explain'} value={inpt['explain']} placeholder="Customer Service, Advice service"></Input>
                </FormControl>
              </Stack>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button variant='ghost' onClick={onClose}>{'Close'}</Button>
            <Button onClick={handleSubmit} colorScheme='blue' mr={3} >
              {'Submit'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <SuccessModal isOpen={successController.isOpen} onClose={successController.onClose} description="Done" />
    </>
  );
}