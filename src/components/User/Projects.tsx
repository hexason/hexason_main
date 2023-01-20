import { Box, Divider, Flex, Heading, Image, Tag, Text } from "@chakra-ui/react";

export default function Projects() {
  return (
    <Box w="100%" borderRadius={"20px"} border={"1px solid teal"} overflow="hidden">
      <Flex h="300px" justifyContent={"center"} position="relative" alignItems="center">
        <Heading>Coming Soon...</Heading>
        <Box p={3} zIndex={"-1"} w="100%" h="100%" position={"absolute"} background="linear-gradient(0deg, teal 33%, rgba(0,235,240,0.2189250700280112) 90%, rgba(0,212,255,0.19091386554621848) 100%)" />
        <Box p={3} zIndex={"-2"} w="100%" h="100%" position={"absolute"}>
          <Box w="100%" h="200px">
            <Flex my="3" w="100%">
              <Box borderRadius={"20px"} overflow="hidden" w="30%">
                <Image src="https://bitcoin-trading.io/wp-content/uploads/2022/06/Af6q2az4.jpg" />
              </Box>
              <Box pl="3" w="70%" position={"relative"}>
                <Text ml="10px" fontWeight={"bold"} fontSize="21px">Walken.io</Text>
                <Divider />
                <Text ml="10px" fontSize="18px">A decentralized social media platform</Text>
                <Box position={"absolute"} bottom="10px" right="10px">
                  <Tag>Earned: $ 100</Tag> <Tag>Score: 6.4/10</Tag> <Tag>Give Feedback</Tag> 
                </Box>
              </Box>
            </Flex>
            <Flex my="3" w="100%">
              <Box borderRadius={"20px"} overflow="hidden" w="30%">
                <Image src="https://assets.polkastarter.gg/Axie_Infinity_2f1ec0f251/Axie_Infinity_2f1ec0f251.jpeg" />
              </Box>
              <Box pl="3" w="70%">
                <Text ml="10px" fontWeight={"bold"} fontSize="21px">Axie Infinity</Text>
                <Divider />
                <Text ml="10px" fontSize="18px">A decentralized social media platform</Text>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}