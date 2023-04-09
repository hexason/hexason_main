import { DetailedHTMLProps, HTMLAttributes, useState } from "react";
import { Stack, Box, Button, HStack, useDisclosure, Grid } from "@chakra-ui/react";

import SayTextAnimate from "../animation/SayTextAnimate";

import { HEXY_GUIDE } from "@/lib/data/conversation";
import { DefaultAnimate } from "../animation";
import { DonationForm, RequestForm } from "../modals";
import { ChatBox } from "../main";

let setences = HEXY_GUIDE
export default function FirstStep(props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  const [step, setStep] = useState(0);
  const handleClick = () => setStep(prev => prev > setences.length - 2 ? prev : prev + 1);
  const hireController = useDisclosure()
  const donateController = useDisclosure()

  return <div {...props}>
    <Stack alignItems={"center"} justifyContent={"center"} minH="100vh">
      {
        step < setences.length - 1 ?
          <Grid gap={"20px"} templateColumns={["repeat(1fr, 1)", "repeat(3, 1fr)"]}>
            {setences[step].images.map((e, i) => <Box
              key={e + i}
              w={["200px", "300px"]}
              borderRadius={"20px"}
              overflow={"hidden"}
            >
              <DefaultAnimate>
                <img style={{ objectFit: "cover" }} width={"100%"} src={e} />
              </DefaultAnimate>
            </Box>)}
          </Grid>
          : <Box
            w={["200px", "300px"]}
            borderRadius={"20px"}
            overflow={"hidden"}
          >
            <DefaultAnimate>
              <img style={{ objectFit: "cover" }} width={"100%"} src={"/images/hexy.png"} />
            </DefaultAnimate>
          </Box>
      }
      <Box
        maxW="80%"
        minH="100px"
        borderRadius={"20px"}
        bg="#ffffffAB"
        p={5}
        transform={"translateY(-30px)"}
        color={"#000"}
        userSelect={"none"}
        fontSize={["1rem","2rem"]}
      >
        {
          step < setences.length - 1 ?
            <SayTextAnimate text={setences[step].text} /> :
            <ChatBox />
        }
      </Box>
      {
        step < setences.length - 1 ?
          <Button
            onClick={handleClick}
            fontSize={"2xl"} >Next</Button>
          : <HStack>
            <Button onClick={donateController.onOpen}>Donate Us</Button>
            <Button onClick={hireController.onOpen}>Hire Us</Button>
          </HStack>
      }
    </Stack>
    <RequestForm isOpen={hireController.isOpen} onClose={hireController.onClose} />
    <DonationForm isOpen={donateController.isOpen} onClose={donateController.onClose} />
  </div>
}