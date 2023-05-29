import { Box, Container, Image, Stack } from "@chakra-ui/react";

export const AuthLayout = ({ children, ...props }: any) => {
  return (
    <Box
      w="100%"
      position={"absolute"}
      zIndex={100}
      top={0}
      {...props}
    >
      <Container maxW="container.lg">
        <Stack minH="100vh" justifyContent={"center"} alignItems={"center"}>
          <Image alt="Hexason" borderRadius={"20px"} h="75px" src="/icon/logo.png" />
          {children}
        </Stack>
      </Container>
    </Box>
  )
}