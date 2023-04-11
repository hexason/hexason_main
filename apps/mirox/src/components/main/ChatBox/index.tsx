import React, { useEffect, useState } from "react";
import axios from "axios";

import ChatWindow from "./ChatWindow";
import ChatComposer from "./ChatComposer";
import { Text } from "@chakra-ui/react";

const ChatBox = () => {
  const [messages, setMessages] = useState<any>([
    { role: "assistant", content: "Hello. I'm Hexy. I'm here to help you." },
  ]);
  const [session, setSession] = useState(Date.now().toString(32) + Math.random())
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('p_chat')) setSession(localStorage.getItem('p_chat') as string);
    else localStorage.setItem('p_chat', session);
  }, [])
  const submitted = (newMessage: any) => {
    if (loading) return;
    setLoading(true);
    setMessages([...messages, { role: "user", content: newMessage }])

    if (newMessage !== "") {
      axios({
        baseURL: process.env.NEXT_PUBLIC_AI_API,
        url: "ai/chat/ask",
        method: "post",
        data: {
          session,
          message: newMessage
        }
      }).then(response => setMessages(response.data)).catch(e => alert(e.message)).finally(() => setLoading(false));
    }
  };

  return (
    <div>
      <ChatWindow messagesList={messages} />
      {loading && <Text fontSize={"14px"}>Hexy is thinking...</Text>}
      <ChatComposer submitted={submitted} />
    </div>
  );
};

export default ChatBox;
