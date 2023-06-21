import { Box } from "@chakra-ui/react";

export const BottomBar = () => {
  return (
    <Box
      display={{ base: "block", md: "none" }}
      h="100px"
      zIndex={"9999"}
      w="100%"
      bg="hexmain.400 "
      position={"fixed"}
      bottom={0}
    >
      {"Bottom navbar here"}
    </Box>
  );
};
