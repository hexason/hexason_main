import { ThreeDotsWave } from "@/components/animation";
import { useCurrencyFormat } from "@/hooks";
import { getPaymentMethods } from "@/lib/Services";
import { useQuery } from "@apollo/client";
import {
  Stack,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Input,
  Wrap,
  FormControl,
  FormLabel,
  Divider,
  Badge,
  Box,
  Image,
  Text,
  Tag,
} from "@chakra-ui/react";

export const PaymentBody = ({ orderId, price }: { orderId: string, price: number }) => {
  const { data, loading } = useQuery(getPaymentMethods);
  const format = useCurrencyFormat()

  if (loading) return <ThreeDotsWave />
  return (
    <Stack>
      <Accordion defaultIndex={[0]}>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Банк шилжүүлэг
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Stack>
              {data.getPaymentMethods.map((method: any) => (
                <Stack key={method.id} border="1px solid #000" borderRadius={"20px"} p={6}>
                  <Image
                    w="200px"
                    src={
                      method.image
                    }
                  />
                  <Divider />
                  <FormControl>
                    <FormLabel>Дансны дугаар</FormLabel>
                    <Input readOnly value={method.bank_account} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Хүлээн авагч</FormLabel>
                    <Input readOnly value={method.bank_reciver} />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontWeight={"boldө"}>
                      Шилжүүлэх дүн
                    </FormLabel>
                    <Input fontWeight={"bold"} readOnly value={format(price, "standard")} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>
                      Гүйлгээний утга
                    </FormLabel>
                    <Input fontWeight={"bold"} readOnly value={"M" + orderId} />
                  </FormControl>
                </Stack>
              ))}
              <Tag p={3} textAlign={"center"} colorScheme="orange">
                {"Таны захиалга шилжүүлэг хийгдсэнээс хойш 24 цагийн дотор баталгаажина"}
              </Tag>
              <Tag p={3} textAlign={"center"} colorScheme="orange">
                {"Захиалга хийгдсэнээс хойш 48 цагийн дотор баталгаажуулалт хийгдээгүй тохиолдолд цуцлагдана"}
              </Tag>
            </Stack>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem opacity="0.5">
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Автомат төлбөрийн хэрэгсэл <Badge>Тун удахгүй</Badge>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Wrap>
              {[
                "/pocketpay.jpg",
                "/socialpay.png",
                "qpay.jpg",
                "https://pngimg.com/uploads/plus/plus_PNG45.png",
              ].map((link) => (
                <PaymentOptionCard src={link} key={link} />
              ))}
            </Wrap>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Stack>
  )
}


const PaymentOptionCard = ({ src }: { src: string }) => {
  return (
    <Box
      p={3}
      boxShadow={"md"}
      _hover={{ boxShadow: "xl", opacity: "0.8", cursor: "pointer" }}
      borderRadius={"10px"}
      overflow={"hidden"}
      aria-label={"payment_option"}
    >
      <Image h="50px" src={src} />
    </Box>
  );
};