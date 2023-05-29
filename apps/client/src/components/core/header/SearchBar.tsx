import { Button, HStack, Input, InputGroup } from "@chakra-ui/react";

export const SearchBar = () => {
  return (
    <HStack>
      <InputGroup
        position={"relative"}
        w="100%"
        borderRadius={"full"}
        overflow={"hidden"}
      >
        <Input
          borderRadius={"full"}
          bg="white"
          h="50px"
        />
        <HStack
          position={"absolute"}
          zIndex="100"
          right={2}
          bottom={"5px"}
          transform={"translate('-50%', 0)"}
        >
          <Button
            borderRadius={"full"}
            colorScheme="green"
            fontSize={"1rem"}
            p={2}
            px={4}
          >Хайх</Button>
        </HStack>
      </InputGroup>
    </HStack>
  )
}