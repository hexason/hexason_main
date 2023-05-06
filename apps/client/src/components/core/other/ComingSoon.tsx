import { Stack, Heading, Image, Button, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import ThreeDotsWave from "../../animation/ThreeDotsWave";
import { ArrorLeft } from "@/assets/icons";
import { useRouter } from "next/navigation";

export default function ComingSoon() {
  const router = useRouter();

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
      <Button onClick={router.back} colorScheme="whiteAlpha"><ArrorLeft fill="white" w={20} /> <Text ml={1}>Буцах</Text></Button>
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