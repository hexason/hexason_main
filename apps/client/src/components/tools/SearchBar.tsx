import { InputGroup, Input, InputRightAddon, Button } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {

  return (
    <InputGroup>
      <Input
        placeholder="Search"
        _focus={{ borderColor: "none", boxShadow: "none" }}
      />
      <InputRightAddon
        as={Button}
        bg={"primary.400"}
        color={"white"}
        _hover={{
          bg: "primary.500",
        }}
      ><FaSearch /></InputRightAddon>
    </InputGroup>
  );

}