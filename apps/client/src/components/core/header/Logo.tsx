import { Image, Stack } from "@chakra-ui/react"

export const Logo = () => {
  return (
    <Stack justifyContent={"center"} alignItems={"center"}>
      <Image w="75px" src="/logo-with-black-bg.png" />
    </Stack>
  )
}