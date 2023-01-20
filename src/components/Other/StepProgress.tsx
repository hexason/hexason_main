import { Flex, Box, Grid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function StepProgress({ totalSteps, acitveSteps, data, ...props }: any) {
  const [steps, setSteps] = useState([false, false, false, false, false]);
  const handleStep = (index: number) => {
    const newSteps = Array(totalSteps || 5).fill(false);
    if (index < 0) return;
    for (let i = 0; i < index; i++) {
      newSteps[i] = true;
    }
    setSteps(newSteps);
  };

  // const handleNext = () => {
  //   const index = steps.findIndex((step) => !step);
  //   handleStep(index + 1);
  // };
  // const handlePrev = () => {
  //   const index = steps.findIndex((step) => !step);
  //   handleStep(index - 1);
  // };

  useEffect(() => {
    handleStep(acitveSteps || 0)
  }, [])

  return (
    <Box width="100%" {...props}>
      <Grid templateColumns="repeat(5, 1fr)" gap={0}>
        {steps.map((item, index) => (<Step key={index} value={(index + 1)} title={data[index]?.title || ''} isActive={item} />))}
      </Grid>
    </Box >
  );
};

const Step = ({ title, value, isActive }: any) => {
  return (
    <Flex justifyContent={"center"} position={"relative"} flexDirection="column" alignItems={"center"}>
      <Flex justifyContent={"center"} alignItems="center"
        w={["50px", "80px"]}
        h={["50px", "80px"]}
        borderRadius={"50%"}
        float={"right"}
        transitionDelay={value + "s"}
        backgroundColor={isActive ? "green" : "gray"}>
        {value}
      </Flex>
      <Text mt={2} textTransform={"uppercase"} >{title}</Text>
      <Box position={"absolute"} zIndex="-2" top="50%" background={"gray"} h="1px" w="100%" />
      <Box transitionDelay={value + "s"} w={isActive ? "100%" : "0"} position={"absolute"} zIndex="-1" top="50%" background={"green"} h="1px" />
    </Flex>
  )
}