import { Box, CircularProgress, Flex, Grid, Input, Text, useToast } from "@chakra-ui/react"
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Board from "../../src/components/Game/Board"
import ChatArea from "../../src/components/Game/ChatArea";
import { SocketContext } from "../../src/context/socket";

export default function ChessGame() {
  const router = useRouter();
  const [gameId, setGameId] = useState("");
  const toast = useToast();
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (!router.isReady) return
    const key = router.query.id
    setGameId(key as string);

  }, [router.isReady]);

  useEffect(() => {
    if(!socket) return;
    socket.on("game:over", () => {
      toast({
        title: "Game Over",
        description: "The game has ended",
        status: "info",
        duration: 9000,
        isClosable: true,
        position: "top"
      });
    })
  }, [socket])

  if (!gameId) return <Flex transition={".5ms"} flexDirection={"column"} justifyContent={"center"} alignItems="center" w="100%" height={"100vh"} top="0" left="0" bg="rgba(0,0,0,0.5)" position={"absolute"}>
    <CircularProgress isIndeterminate />
    <Text>
      Now Game Loading
    </Text>
  </Flex>

  return (
    <Grid templateColumns={["repeat(1,1fr)", "repeat(2,1fr)"]} gap="6">
      <Box bg="white" p="6">
        <Board gameId={gameId} />
      </Box>
      <Box w="100%">
        {/* <Input readOnly value={"Placed: 500$"} /> */}
        <ChatArea gameId={gameId} />
      </Box>
    </Grid>
  )
}