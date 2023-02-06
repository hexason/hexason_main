import { Box, Divider, Flex, Image, Tag, Text } from "@chakra-ui/react";


export default function Projects() {
  const datas:any[] = [];
  return (
    <Box w="100%" borderRadius={"20px"} border={"1px solid teal"} overflow="hidden">
      <Flex h="300px" justifyContent={"center"} overflow="scroll" alignItems="center">
        <Box p={3} w="100%" h="100%">
          <Box w="100%" h="200px">
            {datas.length > 0 ? datas.map((data:any, index) => (<ProjectCard key={index+data} /> )): <Text textAlign={"center"}>No project is available for you. You should buy more investment card</Text>}  
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}

const ProjectCard = () => {
  return (
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
  )
}