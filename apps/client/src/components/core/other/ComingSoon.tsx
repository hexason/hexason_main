import { Stack, Heading, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import ThreeDotsWave from "../../animation/ThreeDotsWave";

export default function ComingSoon() {
  return (
    <Stack
      w="100%"
      minH="100vh"
      position="fixed"
      top="0"
      left="0"
      zIndex="99"
      bg="#000000"
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Image h="75px" src="/logo.png" alt="hexason" />
      <Heading
        as={motion.div}
        color={"white"}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
      >Coming soon</Heading>
      <ThreeDotsWave />
    </Stack>
  )
}