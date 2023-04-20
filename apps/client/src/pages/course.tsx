import DefaultAnimate from "@/components/animation/DefaultAnimate";
import TimeLine from "@/components/core/Course/Timeline";
import { useAuth } from "@/context/AuthContext";
import { Divider, Heading, Stack, Text } from "@chakra-ui/react";
import Head from "next/head";

export default function AuthPage() {
  const { session } = useAuth();
  return (<>
  <Head>
    <title>ZTH16 | Developer Training Project</title>
  </Head>
    <Stack spacing={6} py={6} minH="100vh" alignItems={"center"} justifyContent={"center"}>
      <Heading as={DefaultAnimate}>
        Hi.
        <Text color="teal" as="span">
          {" <br />"}
        </Text>
        <br />
        <Text color="gray.600" as="span">
          {session?.user.email} <br />
        </Text>
        <Text color="teal" as="span">
          {"<"}
        </Text>
        {"Welcome to "}
        <Text color="teal" as="span">
          ZTH16
        </Text>
        {" Program"}
        <Text color="teal" as="span">
          {"/>"}
        </Text>
      </Heading>
      <Divider />
      <TimeLine />
    </Stack>
  </>
  )
}