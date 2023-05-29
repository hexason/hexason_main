import { Container, Stack } from "@chakra-ui/react";

export default function DefaultLayout({ children, ...props }: any) {
  return (
    <Container as={Stack} maxW='container.xl' {...props}>
      {children}
    </Container>
  )
}