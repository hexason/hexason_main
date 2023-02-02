import { Box, CircularProgress, Flex, Grid, Input, Text } from "@chakra-ui/react"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Board from "../../src/components/Game/Board"

export default function ChessGame() {
  const router = useRouter();
  const [gameId, setGameId] = useState("");

  useEffect(() => {
    if (!router.isReady) return
    const key = router.query.id
    setGameId(key as string);

  }, [router.isReady])

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
      <Box>
        <Input readOnly value={"Placed: 500$"} />
      </Box>
    </Grid>
  )
}