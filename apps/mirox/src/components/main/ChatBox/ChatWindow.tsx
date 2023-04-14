import { Box, Stack } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";

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
              <Stack>
                <Box dangerouslySetInnerHTML={{__html: oneMessage.content}} />
              </Stack>
            </Stack>
          ))}
        <div className="reference" ref={messageListEndRef} />
      </div>
    </Box>
  );
}
