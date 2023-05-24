"use client";
import { Grid, GridItem } from "@chakra-ui/react";

export default function HomeHeader() {
  return (
    <Grid h="400px" templateColumns={"repeat(8, 1fr)"} gap={6}>
      <GridItem bg="white" borderRadius={"20px"} colSpan={6}>

      </GridItem>
      <GridItem bg="white" borderRadius={"20px"} colSpan={2}>

      </GridItem>
    </Grid>
  )
}