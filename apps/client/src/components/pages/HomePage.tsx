"use client";
import DefaultAnimate from "@/components/animation/DefaultAnimate";
import ProjectList from "@/components/core/ProjectList";
import { Stack } from "@chakra-ui/react";

export default function Home() {
  return (
    <Stack
      as={DefaultAnimate}
      alignItems={"center"}
      minH="100vh"
      py={6}
      spacing={6}
      w="100%">
      <ProjectList />
    </Stack>
  )
}