import { DefaultLayout } from "@/components/layout"
import { Box, Image } from "@chakra-ui/react"

export const TopAdBar = () => {
  return (
    <Box
      w="100%"
      bg="#b2cd45"
    >
      <DefaultLayout>
        <Image h="75px" w="100%" bg="lighgreen" src="" />
      </DefaultLayout>
    </Box>
  )
}