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
      {...props}
    >
      <Container maxW="container.lg">
        <Stack minH="100vh" justifyContent={"center"} alignItems={"center"}>
          <Image alt="Hexason" borderRadius={"20px"} w="75px" src="https://z-p3-scontent.fsin15-1.fna.fbcdn.net/v/t39.30808-6/339479918_3061180614178603_5904555341040836354_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=ENlAeBq_-hMAX_xhrSx&_nc_ht=z-p3-scontent.fsin15-1.fna&oh=00_AfCKnbBWSMAz1V6LwYSzRgqARW2XEggUQmmGyIxgZcAq1Q&oe=643C23A7" />
          {children}
        </Stack>
      </Container>
    </Box>
  )
}