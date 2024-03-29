"use client";
import {
  Text,
  Flex,
  HStack,
  Box,
  useColorModeValue,
  Container,
} from "@chakra-ui/react";
import Link from "next/link";

const READER_PAGE_LINKS = [
  {
    id: "rp-1",
    url: "/",
    label: "Нүүр",
  },
];

export const TopUpBar = () => {
  return (
    <Box w="100%">
      <Container maxW="container.lg">
        <Flex
          p="2"
          justifyContent={{ base: "center" }}
          w="100%"
        >
          <HStack
            fontSize={"12px"}
            color={useColorModeValue("gray.600", "gray.100")}
          >
            {READER_PAGE_LINKS.map((el) => (
              <Link href={el.url} key={el.id}>
                <Text cursor={"pointer"}>{el.label}</Text>
              </Link>
            ))}
          </HStack>
          <HStack
            display={{ base: "none", md: "flex" }}
            fontSize={"12px"}
            color={useColorModeValue("gray.600", "gray.100")}
          >
            {/* {READER_PAGE_LINKS.map((el) => (
              <Link href={el.url} key={el.id}>
                <Text cursor={"pointer"}>{el.label}</Text>
              </Link>
            ))} */}
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};
