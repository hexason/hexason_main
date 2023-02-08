import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

// Replace test data with your own
const features = [
  {
    id: 1,
    title: 'Register',
    text: '"REGISTER" step is for customers to sign up for the investment opportunity.',
  },
  {
    id: 2,
    title: 'Buy',
    text: 'Customers purchase an investment package, with a certain price that determines the amount of profit they can earn.',
  },
  {
    id: 3,
    title: 'Work on your idea',
    text: 'Customers to provide feedback on their investment, related to performance or other aspects.',
  },
  {
    id: 4,
    title: 'Earn',
    text: 'Customers start earning profits, depending on their investment package.',
  },
  {
    id: 5,
    title: 'Withdraw',
    text: 'You can withdraw your profits at any time. You can also reinvest your profits to earn more.',
  },

]

export default function Testimonial() {
  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
        <Heading fontSize={'3xl'}>Only Few Steps You Can Earn Like Pro Investor</Heading>
        <Text color={'gray.600'} fontSize={'xl'}>
         {"It's important to note that the specific details of the investment opportunity, the terms and conditions, and any potential risks should be clarified by the company or organization offering it before making any investment decisions."}
        </Text>
      </Stack>

      <Container maxW={'6xl'} mt={10}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 5 }} spacing={10}>
          {features.map((feature) => (
            <HStack key={feature.id} align={'top'}>
              <Box color={'green.400'} px={2}>
                <Icon as={CheckIcon} />
              </Box>
              <VStack align={'start'}>
                <Text fontWeight={600}>{feature.title}</Text>
                <Text color={'gray.600'}>{feature.text}</Text>
              </VStack>
            </HStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}