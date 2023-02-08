import { Box, Center, Divider, Heading, Image, Stack } from "@chakra-ui/react";
import Link from "next/link";
export default function InvestorPartners() {
  return (
    <Stack spacing={10}>
      <Box></Box>
      <Divider />
      <Center>
        <Heading>
          Investment Partners Ads
        </Heading>
      </Center>
      <Box as={Link} href="https://www.elegantangel.com/shop/155/studio/adam-eve-studios.html" overflow={"hidden"} borderRadius="20px">
        <Image src="https://imgs1cdn.adultempire.com/bn/1600/lb-s2023-adam-eve-february-sale.jpg" />
      </Box>
    </Stack>
  )
}