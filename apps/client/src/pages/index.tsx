import { Container, Stack } from '@chakra-ui/react';
import DefaultAnimate from '@/components/animation/DefaultAnimate';
import ChatBox from '@/components/core/ChatBox';

export default function Home() {
  return (
    <>
      <Stack
        as={DefaultAnimate}
        alignItems={"center"}
        minH="100vh"
        py={6}
        spacing={6}
        w="100%">
        {/* <BigHeader /> */}
        {/* <ProjectList /> */}
        <Container border="1px solid #fff" p="3" borderRadius={"base"} maxW={"container.lg"}>
          <ChatBox />
        </Container>
      </Stack>
    </>
  )
}