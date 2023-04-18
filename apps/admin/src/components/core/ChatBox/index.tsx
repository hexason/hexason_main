import React, { useEffect, useState } from "react";
import axios from "axios";

import ChatWindow from "./ChatWindow";
import ChatComposer from "./ChatComposer";
import { Checkbox, Divider, HStack, Stack, Text } from "@chakra-ui/react";

const ChatBox = () => {
  const [messages, setMessages] = useState<any>([
    { role: "assistant", content: "Hello. I'm Hexy. I'm here to help you." },
  ]);
  const [session, setSession] = useState(Date.now().toString(32) + Math.random())
  const [loading, setLoading] = useState(false);
  const [translate, setTranslate] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('p_chat')) setSession(localStorage.getItem('p_chat') as string);
    else localStorage.setItem('p_chat', session);
  }, [session]);

  const submitted = (newMessage: any) => {
    if (loading) return;
    setLoading(true);
    setMessages([...messages, { role: "user", content: newMessage }])
    if (newMessage !== "") {
      axios({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        url: "ai/chat/ask",
        method: "post",
        data: {
          session,
          message: newMessage,
          translate: translate
        }
      }).then(response => setMessages(response.data)).catch(e => alert(e.message)).finally(() => setLoading(false));
    }
  };

  return (
    <Stack
      w="100%"
      p={3}
      spacing={6}
      border="1px solid #000"
      borderRadius={"20px"}
    >
      <HStack px={6} pt={3}>
        <Checkbox onChange={(e) => setTranslate(e.target.checked)} />
        <Text fontSize={"14px"}>Google Translate ашиглах</Text>
      </HStack>
      <Divider />
      <ChatWindow messagesList={messages} />
      {loading && <Text fontSize={"14px"}>Hexy is thinking...</Text>}
      <ChatComposer submitted={submitted} />
    </Stack>
  );
};

export default ChatBox;
