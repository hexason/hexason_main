import ChatBox from "@/components/core/ChatBox";
import { Container, Text } from "@chakra-ui/react";

export default function Support() {
  return (
    <Container maxW="container.lg">
      <Text color="gray.500">{'"Мирокс Ойн" талаар мэдээлэл өгч сургасан бот. Та туршаад үзээрэй. Хэрэв та яг ийм бот хийлгэх хүсэлтэй бол манай пэйж хуудсаар холбоо барина уу. https://facebook.com/hexason'}</Text>
      <ChatBox />
    </Container>
  )
}