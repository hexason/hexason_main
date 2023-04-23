import { Container, Heading, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";

export default function BigHeader() {
  const [selectedContent] = useState(0)
  const [content] = useState([
    {
      id: 0,
      title: "Pointes",
      text: "Цахим худалдааны систем тун удахгүй. Таны хайсан бүхэн заавал байх болно",
      image: "https://www.skunexus.com/hubfs/essential-ecommerce-website-tools.jpg"
    }
  ]);

  return (
    <Container maxW={"container.xl"}>
      <Stack overflow="hidden" boxShadow={"-20px 0px 20px rgba(255, 255, 255, 0.5)"} borderRadius={"20px"} h="30vh" w="100%" bg={`url(${content[selectedContent].image})`}>
        <Stack fontStyle={"italic"} p={6} bg="linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)" w="100%" h="100%">
          <Heading>Онцлох:</Heading>
          <Text color="gray.400" fontSize={"2rem"}>{content[selectedContent].title}</Text>
          <Text color="gray.400" fontSize={"1rem"}>{content[selectedContent].text}</Text>
        </Stack>
      </Stack>
    </Container>
  )
}