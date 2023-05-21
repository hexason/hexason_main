import { Box, Button, HStack, Input, InputGroup, InputLeftAddon, InputRightAddon, Stack } from "@chakra-ui/react";

export const SearchBar = () => {
  return (
    <HStack h="100%" justifyContent={"center"}>
      <Box
        borderColor={"black"}
        border="1px solid #000"
        w="100%" borderRadius={"2xl"} overflow={"hidden"}>
        <InputGroup>
          <InputLeftAddon>
            Search
          </InputLeftAddon>
          <Input border="unset" />
          <InputRightAddon border="unset" p={1} bg="unset">
            <Button>
              Search
            </Button>
          </InputRightAddon>
        </InputGroup>
      </Box>
    </HStack>
  )
}