"use client"
import DefaultLayout from "@/components/layout/DefaultLayout";
import { Text, Flex, HStack, Link, Box, useColorMode, useColorModeValue, Button } from "@chakra-ui/react";


const READER_PAGE_LINKS = [
  {
    id: "rp-1",
    url: "/reader/terms",
    label: "Үйлчилгээний нөхцөл"
  },
  {
    id: "rp-2",
    url: "/reader/about",
    label: "Бидний тухай"
  },
  {
    id: "rp-3",
    url: "/reader/about",
    label: "Холбоо барих"
  }
]

export default function TopUpBar() {
  const { toggleColorMode } = useColorMode()
  return (
    <Box w="100%">
      <DefaultLayout>
        <Flex p="2" justifyContent={{ base: "center", md: "space-between" }} w="100%">
          <HStack display={{ base: "none", md: "flex" }} fontSize={"12px"} color={useColorModeValue("gray.600", "gray.100")}>
            {READER_PAGE_LINKS.map(el => (
              <Link href={el.url} key={el.id}>
                <Text cursor={"pointer"}>{el.label}</Text>
              </Link>
            ))}
          </HStack>
          <HStack display={{ base: "none", md: "flex" }} fontSize={"12px"} color={useColorModeValue("gray.600", "gray.100")}>
            {READER_PAGE_LINKS.map(el => (
              <Link href={el.url} key={el.id}>
                <Text cursor={"pointer"}>{el.label}</Text>
              </Link>
            ))}
          </HStack>
        </Flex>
      </DefaultLayout>
    </Box >
  )
}