"use client";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import Link from "next/link";

export function NotFound() {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, hexmain.400, hexmain.600)"
        backgroundClip="text"
      >
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Page Not Found
      </Text>
      <Text color={"gray.500"} mb={6}>
        {"The page you're looking for does not seem to exist"}
      </Text>
      <Button
        as={Link}
        href={"/shop"}
        colorScheme="teal"
        bgGradient="linear(to-r, hexmain.400, hexmain.500, hexmain.600)"
        color="white"
        variant="solid"
      >
        Go to Home
      </Button>
    </Box>
  );
}
