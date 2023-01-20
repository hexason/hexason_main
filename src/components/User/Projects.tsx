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
              <Box minH="60px" borderRadius={"20px"} overflow="hidden" w="30%">
                <Image h="100%" src="https://bitcoin-trading.io/wp-content/uploads/2022/06/Af6q2az4.jpg" />
              </Box>
              <Box pl="3" w="70%" position={"relative"}>
                <Text ml="10px" fontWeight={"bold"} fontSize="21px">Walken.io</Text>
                <Divider />
                <Text minH={"60px"} ml="10px" fontSize="18px">Walk and Earn</Text>
                <Flex w="100%" justifyContent={"end"} alignItems="end">
                  <Tag>Earned: $ 100</Tag> {<Box pl="10px" display={["none", "block"]}>
                    <Tag>Score: 6.4/10</Tag> <Tag>Give Feedback</Tag>
                  </Box>
                  }
                </Flex>
              </Box>
            </Flex>
            <Flex my="3" w="100%">
              <Box minH="60px" borderRadius={"20px"} overflow="hidden" w="30%">
                <Image h="100%" src="https://bitcoin-trading.io/wp-content/uploads/2022/06/Af6q2az4.jpg" />
              </Box>
              <Box pl="3" w="70%" position={"relative"}>
                <Text ml="10px" fontWeight={"bold"} fontSize="21px">Axie Infinity</Text>
                <Divider />
                <Text minH={"60px"} ml="10px" fontSize="18px">Walk and Earn</Text>
                <Flex w="100%" justifyContent={"end"} alignItems="end">
                  <Tag>Earned: $ 100</Tag> {<Box pl="10px" display={["none", "block"]}>
                    <Tag>Score: 6.4/10</Tag> <Tag>Give Feedback</Tag>
                  </Box>
                  }
                </Flex>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}