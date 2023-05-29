import { Box, Stack, Text, Wrap } from "@chakra-ui/react";
import { useState } from "react";

export default function Integration() {
  const [integrations] = useState([
    {
      url: " https://taobao.com",
      state: "Coming soon...",
      image: "https://mms.businesswire.com/media/20210428005413/en/874604/5/library_logos_taobao_large.jpg"
    },
    {
      url: "ebay.mn",
      state: "Coming soon...",
      image: "https://www.repricer.com/wp-content/uploads/2022/02/ebay-repricer@1x.png"
    },
    {
      url: "https://shoppy.mn",
      state: "Coming soon...",
      image: "https://cdn3.shoppy.mn/assets/2391/content/shoppy_wallpaper.jpg"
    },
    {
      url: "https://shopee.mn",
      state: "Coming soon...",
      image: "https://deo.shopeemobile.com/shopee/shopee-mobilemall-live-sg/26c9324913c021677768c36975d635ef.png"
    },
  ])
  return (
    <Wrap>
      {integrations.map(el => (
        <Box
          key={el.url}
          bg="white"
          backgroundImage={`url(${el.image})`}
          backgroundPosition={"center"}
          backgroundSize={"contain"}
          backgroundRepeat={"no-repeat"}
          w="200px"
          h="200px"
          borderRadius={"20px"}
          overflow={"hidden"}
          className="hover-overlay-show"
        >
          <Stack
            h="100%"
            w="100%"
            transition={"0.3s"}
            bg="#000000AB"
            alignItems={"center"}
            justifyContent={"center"}
            className="overlay-image"
          >
            <Text fontWeight={"bold"} textTransform={"uppercase"}>{el.state}</Text>
          </Stack>
        </Box>
      ))}
    </Wrap>
  )
}