import { FirstStep, SecondStep, ThirdStep } from "@/components/steps";
import { useState } from "react";
import { Background, Footer } from "@/components/main";
import Head from "next/head";

export default function Home() {
  const [steps] = useState(0);
  const viewer = [<FirstStep key="ss1" />, <SecondStep key="ss2" />, <ThirdStep key="ss3" />];
  // const handleStepChange = () => setSteps((prev) => (prev > viewer.length - 2) ? 0 : prev + 1);

  return (
    <>
      <Head>
        <title>Mirox Forest</title>
        <link rel="icon" type="image/png" href="/images/hexy.png"></link>
      </Head>
      <Background>
        <div
        // onClick={handleStepChange}
        >
          {viewer[steps]}
        </div>
        <Footer />
      </Background>
    </>
  )
} 