import {
	Button,
	HStack,
	Input,
	InputGroup,
	InputLeftElement,
	InputRightElement,
} from "@chakra-ui/react";

export const SearchBar = () => {
	return (
		<InputGroup size="lg" w="100%">
			<Input borderRadius="full" />
			<InputRightElement w="100px" mr={1}>
				<Button borderRadius="full" colorScheme="hexmain" w="100%">
					Хайх
				</Button>
			</InputRightElement>
		</InputGroup>
	);
};
