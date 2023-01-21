import { Box, Button, Center, Divider, Heading } from "@chakra-ui/react";
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
  const { user, signIn } = useUser();
  const [activeStep, setActiveStep] = useState(0);
  const [handlerFunction, setHandlerFunction] = useState(() => () => { });

  useEffect(() => {
    if (user.id) setActiveStep(1);
    if(activeStep === 1) setHandlerFunction(() => () => router.push("/"));
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
        {user.id ? <Button onClick={handlerFunction} colorScheme={"teal"}>Contiune Your Progress</Button> : <Button colorScheme={"teal"} onClick={signIn}>Get Start with Google</Button>}
        
      </Center>
    </Box>
  )

}