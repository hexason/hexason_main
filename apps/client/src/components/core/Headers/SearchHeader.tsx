import { Grid, GridItem } from "@chakra-ui/react";

export default function SearchHeader() {
  return (
    <Grid templateColumns={"repeat(10,1fr)"}>
      <GridItem colSpan={2}>1</GridItem>
      <GridItem colSpan={6}>2</GridItem>
      <GridItem colSpan={2}>3</GridItem>
    </Grid>
  )
}