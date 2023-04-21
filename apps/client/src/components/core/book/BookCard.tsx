import { Box, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function BookCard({ id, coverImage, title }: { id: string, coverImage: string, title: string }) {
  const router = useRouter()
  return (
    <Flex
      h="300px"
      w="100%"
      cursor="pointer"
      onClick={() => { router.push("/game?id=" + id) }}
    >
      <Box
        h="290px" w="95%"
        backgroundImage={`url(${coverImage})`}
        overflow={"hidden"}
        backgroundPosition="center"
        backgroundRepeat={"no-repeat"}
        backgroundSize="cover"
        boxShadow={"md"}
        borderRadius="20px"
        position={"relative"}
        _hover={{ h: "300px" }}
        transition=".5s"
      >
        <Flex
          zIndex={1}
          w="100%"
          justifyContent={"center"}
          alignItems="center"
          position={"absolute"}
          bottom="20px"
        >
          <Text textAlign={"center"} fontWeight={"bold"} fontSize={"20px"} color="white" dangerouslySetInnerHTML={{ __html: title }} />
        </Flex>
        <Box position={"absolute"} w="100%" h="100%" bg="linear-gradient(180deg, rgba(2,0,36,0) 33%, rgba(13,0,85,1) 100%)"></Box>
      </Box>
    </Flex>
  )
}