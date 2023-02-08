import {
  Flex,
  Stack,
  Button,
  Divider,
  Image,
  Text,
} from '@chakra-ui/react';
import { useUser } from '@/context/UserContext';
import DefaulModal from './DefaultModal';

export default function LoginModal() {
  const {actions} = useUser();

  return (
    <DefaulModal>
      <Flex
        align={'center'}
        justify={'center'}
      >
        <Stack mx={'auto'} >
          <Stack spacing={4}>
            <Button
              colorScheme={"teal"}
              onClick={() => actions?.signIn("google")}
              >
              <Image h="20px" src="https://img.freepik.com/free-icon/search_318-265146.jpg" mr="3" /> 
              <Text>Sign In With Google</Text>
            </Button>
            <Button
              colorScheme={"teal"}
              onClick={() => actions?.signIn("facebook")}
              isDisabled={true}
              >
              <Image h="20px" src="https://www.edigitalagency.com.au/wp-content/uploads/Facebook-logo-blue-circle-large-white-f.png" mr="3" /> 
              <Text>Sign in With Facebook</Text>
            </Button>
            <Divider />
            {/* <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
            <Button
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}>
              Sign in / Register
            </Button> */}
          </Stack>
        </Stack>
      </Flex>
    </DefaulModal>
  );
}