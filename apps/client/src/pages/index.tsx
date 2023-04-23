import { Stack } from '@chakra-ui/react';
import DefaultAnimate from '@/components/animation/DefaultAnimate';
import BigHeader from '@/components/core/BigHeader';
import ProjectList from '@/components/core/ProjectList';

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
        <BigHeader />
        <ProjectList />
      </Stack>
    </>
  )
}