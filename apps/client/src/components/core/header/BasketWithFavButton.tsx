import { ShopCartIcon, HeartIcon } from "@/assets/icons"
import { HStack, Button, Badge } from "@chakra-ui/react"

export const BasketWithFavButton = () => {
  return (
    <HStack h="100%" justifyContent={"end"} alignItems={"center"} spacing={"0"}>
      <Button position={"relative"} h="80%" p={6} border="1px solid green" borderLeftRadius={"full"} colorScheme="green">
        <ShopCartIcon fill="white" width={30} height={30} />
        <Badge position={"absolute"} top="3" left="3" borderRadius={"full"}>2</Badge>
      </Button>
      <Button position={"relative"} h="80%" p={6} border="1px solid green" borderRightRadius={"full"} colorScheme="green">
        <HeartIcon fill="white" width={30} height={30} />
        <Badge position={"absolute"} top="3" left="3" borderRadius={"full"}>2</Badge>
      </Button>
    </HStack>
  )
}