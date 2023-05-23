import { Box, HStack, Image, Stack, Text } from "@chakra-ui/react"

export const Logo = () => {
  return (
    <Stack justifyContent={"center"} alignItems={"center"}>
      <HStack>
        <Image w="75px" src="/logo-with-black-bg.png" />
        <Stack>
          <Text fontWeight={"bold"} fontSize={"1.5rem"}>Hex</Text>
          <Box>AS ON</Box>
        </Stack>
      </HStack>
    </Stack>
  )
}