import { Box, Image } from "@chakra-ui/react";

export default function MiniAvatar({src, trigger}:any) {
  return (
    <Box w="30px" onClick={trigger ? trigger : () => {}}>
      <Image w="100%" src={src} />
    </Box>
  )
}