import DefaultAnimate from "@/components/animation/DefaultAnimate";
import { Box, Container, Image, Stack } from "@chakra-ui/react";

export default function AuthLayout({ children, ...props }: any) {
  return (
    <Box
      w="100%"
      bg={"#28243D"}
      color="white"
      position={"absolute"}
      zIndex={100}
      top={0}
      as={DefaultAnimate}
      {...props}
    >
      <Container maxW="container.lg">
        <Stack minH="100vh" justifyContent={"center"} alignItems={"center"}>
          <Image alt="Hexason" borderRadius={"20px"} h="75px" src="/logo.png" />
          {children}
        </Stack>
      </Container>
    </Box>
  )
}