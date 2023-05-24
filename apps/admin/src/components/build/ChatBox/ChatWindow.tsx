import { GTransIcon } from "@/assets/icons";
import DefaultAnimate from "@/components/core/animation/DefaultAnimate";
import { useAxios } from "@/hooks/useAxios";
import { Avatar, Box, CircularProgress, Stack, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

export default function ChatWindow({ messagesList }: any) {
  const messageListEndRef = useRef(null);

  useEffect(() => {
    if (messageListEndRef.current) (messageListEndRef.current as any).scrollIntoView({ behavior: "smooth" });
  }, [messagesList]);

  return (
    <Stack
      borderRadius={"20px"}
      bg="#0000001B"
      p={6}
      w="100%"
      h="50vh"
      overflowY="auto"
      spacing="10px"
    >
      {Array.isArray(messagesList) &&
        messagesList.map((oneMessage, index) => (
          <OneMessage key={index} oneMessage={oneMessage} />
        ))}
      <div className="reference" ref={messageListEndRef} />
    </Stack>
  );
}

const OneMessage = ({ oneMessage }: { oneMessage: any }) => {
  const [message, setMessage] = useState("")
  const axios = useAxios();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const translateIt = async () => {
    setLoading(true);
    await axios.post("/ai/google/translate", {
      text: oneMessage.content,
      target: "mn",
      source: "en",
    }).then(({ data }) => {
      setMessage(data.translatedText)
    }).catch(err => {
      toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    });
    setLoading(false)
  }
  return (
    <Stack
      as={DefaultAnimate}
      // spacing={5}
      w='100%'
      fontSize={"14px"}
      // alignItems={"center"}
      direction={oneMessage.role === "user" ? "row-reverse" : "row"}
    >
      <Box>
        <Avatar src={oneMessage.role !== "user" ? "https://cdn.discordapp.com/attachments/960216281993322606/1098000261672349696/hexy.webp" : "https://cdn.discordapp.com/attachments/960216281993322606/1098000590820343858/image.png"}
        />
      </Box>
      <Box maxW="60%" p={3} borderRadius={"20px"} bg="gray.700">
        <Text dangerouslySetInnerHTML={{ __html: oneMessage.content }} />
        <Text color="gray.400" dangerouslySetInnerHTML={{ __html: message }} />
      </Box>
      <Stack alignItems={"center"} cursor={"pointer"} onClick={translateIt}>
        {
          loading ?
            <CircularProgress size={'20px'} isIndeterminate />
            : message ? null : <GTransIcon height={20} width={20} fill="gray" />
        }
      </Stack>
    </Stack>
  )
}