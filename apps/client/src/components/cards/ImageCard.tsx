import { Box, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function ImageCard({ children, src, href }: { children: any, src: string, href: string }) {
  return (
    <Box
      w="300px"
      h="200px"
      borderRadius={"20px"}
      backgroundPosition={"center"}
      backgroundSize={"cover"}
      backgroundImage={`url(${src})`}
      overflow={"hidden"}
      cursor={"pointer"}
      as={Link}
      href={href}
    >
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        w="100%"
        h="100%"
        bg="linear-gradient(180deg, rgba(2,0,36,0) 0%, rgba(0,0,0,1) 100%)"
      >
        <Box>
          {children}
        </Box>
      </Stack>
    </Box>
  )
}