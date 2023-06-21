import { Box, HStack, Image, Stack, Text } from "@chakra-ui/react";

export const Logo = () => {
  return (
    <Stack justifyContent={"center"} alignItems={"flex-start"}>
      <HStack bg="hexmain.500" borderRadius={"20px"} overflow={"hidden"}>
        <Image h="48px" src="/logo-with-black-bg.png" />
        <Stack color="hexhighligth.100" pr={3}>
          <Text fontWeight={"bold"} fontSize="xl">
            Hexason
          </Text>
        </Stack>
      </HStack>
    </Stack>
  );
};
