import { useCurrencyFormat } from '@/hooks'
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
  Stack,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Avatar,
  Input,
  Wrap,
  Image,
  IconButton,
  HStack,
  FormControl,
  FormLabel,
  Divider,
  ChakraProps,
} from '@chakra-ui/react'
import { PropsWithChildren } from 'react'


export function PaymentModalButton({ children, ...props }: ChakraProps & PropsWithChildren) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const fomatter = useCurrencyFormat();

  return (
    <>
      <Button {...props} onClick={onOpen}>{children}</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Төлбөрийн хуудас</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Accordion defaultIndex={[0]}>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex='1' textAlign='left'>
                        Данснаас төлөх
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Stack justifyContent={"center"} alignItems={"center"}>
                      <Avatar />
                      <Input readOnly value={"Үлдэгдэл:" + fomatter(10000, "standard")} textAlign={"center"} />
                    </Stack>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex='1' textAlign='left'>
                        Автомат төлбөрийн хэрэгсэл
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Wrap>
                      {["/pocketpay.jpg", "/socialpay.png", "qpay.jpg", "https://pngimg.com/uploads/plus/plus_PNG45.png"].map(link => <PaymentOptionCard src={link} key={link} />)}
                    </Wrap>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex='1' textAlign='left'>
                        Банк шилжүүлэг
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Stack border="1px solid #000" borderRadius={"20px"} p={6}>
                      <Image w="200px" src={"https://www.unepfi.org/wordpress/wp-content/uploads/2015/04/Golomt-logo-ENG.jpg"} />
                      <Divider />
                      <FormControl>
                        <FormLabel fontWeight={"bold"}>Дансны дугаар</FormLabel>
                        <Input readOnly value={2222222222} />
                      </FormControl>
                      <FormControl>
                        <FormLabel fontWeight={"bold"}>Хүлээн авагч</FormLabel>
                        <Input readOnly value={"Тест"} />
                      </FormControl>
                      <FormControl>
                        <FormLabel fontWeight={"boldө"}>Шилжүүлэх дүн</FormLabel>
                        <Input readOnly value={"2,000,000₮"} />
                      </FormControl>
                      <FormControl>
                        <FormLabel fontWeight={"bold"}>Гүйлгээний утга</FormLabel>
                        <Input readOnly value={"0114108"} />
                      </FormControl>
                    </Stack>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <HStack w="100%" justifyContent={"center"} alignItems={"center"}>
              <Button onClick={onClose}>
                ШАЛГАХ
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal >
    </>
  )
}

const PaymentOptionCard = ({ src }: { src: string }) => {
  return (
    <Box p={3} boxShadow={"md"} _hover={{ boxShadow: "xl", opacity: "0.8", cursor: "pointer" }} borderRadius={"10px"} overflow={"hidden"} aria-label={'payment_option'}>
      <Image h="50px" src={src} />
    </Box>
  )
}