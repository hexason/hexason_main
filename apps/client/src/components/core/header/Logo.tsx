import { Box, HStack, Image, Stack, Text } from "@chakra-ui/react"

export const Logo = () => {
  return (
    <Stack justifyContent={"center"} alignItems={"center"}>
      <HStack bg="green" borderRadius={"20px"} overflow={"hidden"}>
        <Image h="75px" src="/logo-with-black-bg.png" />
        <Stack color="white" pr={3}>
          <Text fontWeight={"bold"} fontSize={"1.5rem"}>Hex AS ON</Text>
        </Stack>
      </HStack >
    </Stack >
  )
}