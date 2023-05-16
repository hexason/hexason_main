import { Container } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export default function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <Container maxW='container.xl'>
      {children}
    </Container>
  )
}