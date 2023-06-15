import { Badge, Box, ChakraComponent, HStack, Heading, Stack } from "@chakra-ui/react"
import { ArrowDown, ArrowUp } from "@/assets/icons"

export const StatisticCard = ({ label, value, isUp, ...props }: ChakraComponent<"div"> & { label: string, value: number | string, isUp: boolean }) => {
  return (
    <Box
      h="100px"
      w="200px"
      bg="hexmain.50"
      overflow={"hidden"}
      boxShadow={"md"}
      position={"relative"}
      p={3}
      {...props}
    >
      <Stack justifyContent={"center"} alignItems={"center"}>
        <Box fontSize={"12px"}>
          {label}
        </Box>
        <HStack>
          <Heading fontSize={"2rem"}>{value}</Heading>
          <Badge bg={isUp ? "green.400" : "red.400"}>{
            isUp ? <ArrowUp height="20" width="10" fill="white" /> : <ArrowDown height="20" width="10" fill="white" />
          }</Badge>

        </HStack>
      </Stack>
    </Box>
  )
}