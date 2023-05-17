import { Container, Stack } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export default function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <Container as={Stack} maxW='container.xl'>
      {children}
    </Container>
  )
}