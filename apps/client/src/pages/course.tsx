import DefaultAnimate from "@/components/animation/DefaultAnimate";
import ThreeDotsWave from "@/components/animation/ThreeDotsWave";
import AuthForm from "@/components/core/Auth/AuthForm";
import AuthLayout from "@/components/core/Auth/AuthLayout";
import { useAuth } from "@/context/AuthContext";
import { Center, Divider, Heading, Stack, Text } from "@chakra-ui/react";

export default function AuthPage() {
  const { session, supabase } = useAuth();
  if (!session)
    return (
      <AuthLayout>
        <AuthForm supabaseClient={supabase} />
      </AuthLayout>
    )

  return (
    <Stack height="100vh" alignItems={"center"} justifyContent={"center"}>
      <Heading as={DefaultAnimate}>
        Hi.
        <Text color="teal" as="span">
          {" <br />"}
        </Text>
        <br />
        <Text color="gray.600" as="span">
          {session.user.email} <br />
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
        <Center>
          <Divider />
          <Text mt={6}>
            Magic will come soon
          </Text>
        </Center>
        <ThreeDotsWave />
      </Heading>
    </Stack>
  )
}