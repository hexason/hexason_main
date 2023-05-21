import { DefaultLayout } from "@/components/layout"
import { Box, Image } from "@chakra-ui/react"

export const TopAdBar = () => {
  return (
    <Box
      w="100%"
      bg="#fd9e4c"
    >
      <DefaultLayout>
        <Image w="100%" src="https://gw.alicdn.com/imgextra/i2/O1CN01P9cnSn1yPZNYEjnsA_!!6000000006571-0-tps-1190-80.jpg_Q75.jpg_.webp" />
      </DefaultLayout>
    </Box>
  )
}