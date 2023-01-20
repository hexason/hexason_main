import { Box, Center, Divider, Heading } from "@chakra-ui/react";
import FeaturedDetail from "../src/components/Other/FeaturedDetail";
import StepProgress from "../src/components/Other/StepProgress";
import Testimonial from "../src/components/Other/Testimonial";
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
  return (
    <Box>
      <FeaturedDetail />  
      <Divider />
      {/* 
      <Center>
        <Heading mt={5}>ONLY FEW STEPS, YOU CAN EARN ANOMALY</Heading>
      </Center> */}
      <Testimonial />
      <StepProgress totalSteps={data.length} acitveSteps={1} data={data} my="5" />
    </Box>
  )

}