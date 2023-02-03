import { Box, Button, Flex, Input, InputGroup, InputRightAddon, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../context/socket";

export default function ChatArea({ gameId }: { gameId: string }) {
  const socket = useContext(SocketContext);
  const [list, setList] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!socket) return;
    socket.emit("game:message", {
      key: gameId,
      message
    })
    setMessage("");
  }

  const handleInput = (e: any) => {
    setMessage(e.target.value);
  }


  useEffect(() => {
    if (!socket) return;
    socket.on("game:message", (data) => {
      const { key, message, token } = data;
      if (key !== gameId) return;
      setList((prev) => [...prev, { 
        message,
        token: token.length > 7 ? token.slice(0, 7) + "..." : token,
        isMe: token === socket.id }]);
    })

    return () => {
      socket.off("game:message");
    }
  });

  return (
    <Box border={"1px solid teal"} borderRadius="20px" h="400px" position={"relative"} overflow="hidden">
      <Box position={"absolute"} w="100%" p="3" h="350px" overflow={"scroll"}>
        {list.map((item, index) => 
        <Flex key={index + item.token} flexDir={"row"}>
          <Box color={item.isMe ? "green" : "blue"} id="chat-box" fontWeight={"bold"}>{item.token}:</Box>
          <Text maxW='80%' ml="2">{item.message}</Text>
        </Flex>)}
      </Box>
      <Flex w="100%" bg="teal" position={"absolute"} bottom="0">
        <InputGroup>
          <Input value={message} onChange={handleInput} onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }} placeholder="Write your message..." />
          <InputRightAddon as={Button} onClick={handleSend}>
            Send
          </InputRightAddon>
        </InputGroup>
      </Flex>
    </Box>
  )
}