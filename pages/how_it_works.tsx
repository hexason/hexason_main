import { Box, Button, Center, Divider, Heading, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FeaturedDetail from "../src/components/Other/FeaturedDetail";
import StepProgress from "../src/components/Other/StepProgress";
import Testimonial from "../src/components/Other/Testimonial";
import { useUser } from "../src/context/UserContext";
const data = [
  {
    title: "Register",
  },
  {
    title: "Buy",
  },
  {
    title: "Idea",
  },
  {
    title: "Earn",
  },
  {
    title: "Withdraw",
  },
]
export default function HowItWorks() {
  const router = useRouter();
  const { user, onOpen, products } = useUser();
  const [activeStep, setActiveStep] = useState(0);
  const [handlerFunction, setHandlerFunction] = useState(() => () => { });
  const toast = useToast()

  useEffect(() => {
    if (user.id) setActiveStep(1);
    if(products.length > 0) setActiveStep(4); 
    if(activeStep === 1) setHandlerFunction(() => () => {
      toast({
        position: "top",
        title: "Purchase a card",
        description: "Now you can purchase a card to start earning",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
      router.push("/")
    });
    if(activeStep === 4) setHandlerFunction(() => () => router.push("/user"));

  }, [user, activeStep]);

  return (
    <Box>
      <FeaturedDetail />
      <Divider />
      {/* 
      <Center>
        <Heading mt={5}>ONLY FEW STEPS, YOU CAN EARN ANOMALY</Heading>
      </Center> */}
      <Testimonial />
      <StepProgress totalSteps={data.length} acitveSteps={activeStep} data={data} my="5" />

      <Center>
        {activeStep > 0 ? <Button onClick={handlerFunction} colorScheme={"teal"}>{activeStep === 1 ? ' Contiune Your Progress' : 'Go to Your Profile'}</Button> : <Button colorScheme={"teal"} onClick={onOpen}>Get Start</Button>}
        
      </Center>
    </Box>
  )

}