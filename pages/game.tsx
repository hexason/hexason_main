import { Box, Grid, Input } from "@chakra-ui/react"
import Board from "../src/components/Game/Board"



export default function ChessGame() {


  return (
    <Grid templateColumns={["repeat(2,1fr)"]} gap="6">
      <Box bg="white" p="6">
        <Board />
      </Box>
      <Box>
        <Input readOnly value={"Placed: 500$"} />
      </Box>
    </Grid>
  )
}