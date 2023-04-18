import DefaultAnimate from "@/components/animation/DefaultAnimate";
import { Avatar, Box, Stack } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";

export default function ChatWindow({ messagesList }: any) {
  const messageListEndRef = useRef(null);

  useEffect(() => {
    if (messageListEndRef.current) (messageListEndRef.current as any).scrollIntoView({ behavior: "smooth" });
  }, [messagesList]);

  return (
    <Stack
      borderRadius={"20px"}
      bg="#0000001B"
      p={6} w="100%"
      h="50vh"
      overflowY="auto"
      spacing="10px"
    >
      {Array.isArray(messagesList) &&
        messagesList.map((oneMessage, index) => (
          <Stack as={DefaultAnimate} spacing={5} w='100%' fontSize={"14px"} key={index} direction={oneMessage.role === "user" ? "row-reverse" : "row"}>
            <Box>
              <Avatar  src={oneMessage.role !== "user" ? "https://cdn.discordapp.com/attachments/960216281993322606/1098000261672349696/hexy.webp" : "https://cdn.discordapp.com/attachments/960216281993322606/1098000590820343858/image.png"}
              />
            </Box>
            <Box p={3} borderRadius={"20px"} bg="gray.700" dangerouslySetInnerHTML={{ __html: oneMessage.content }} />
            <Box>translate</Box>
          </Stack>
        ))}
      <div className="reference" ref={messageListEndRef} />
    </Stack>
  );
}
