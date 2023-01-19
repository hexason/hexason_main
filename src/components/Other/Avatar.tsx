import { Box, Image } from "@chakra-ui/react";

export default function MiniAvatar({src}:any) {
  return (
    <Box w="30px">
      <Image w="100%" src={src} />
    </Box>
  )
}