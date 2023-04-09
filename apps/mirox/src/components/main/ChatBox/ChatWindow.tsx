import { Box, Stack, Wrap } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

export default function ChatWindow({ messagesList }: any) {
  const messageListEndRef = useRef(null);

  useEffect(() => {
    if (messageListEndRef.current) (messageListEndRef.current as any).scrollIntoView({ behavior: "smooth" });
  }, [messagesList]);

  return (
    <Box>
      <div className="box">
        {Array.isArray(messagesList) &&
          messagesList.map((oneMessage, index) => (
            <Stack w='100%' fontSize={"14px"} key={index} direction={oneMessage.role === "user" ? "row-reverse" : "row"}>
              <Box w="30px" overflow={"hidden"}>
                <img src="/images/hexy.png" />
              </Box>
              <Wrap>
                <ReactMarkdown>{oneMessage.content}</ReactMarkdown>
              </Wrap>
            </Stack>
          ))}
        <div className="reference" ref={messageListEndRef} />
      </div>
    </Box>
  );
}
