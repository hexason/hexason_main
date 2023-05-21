import { Logo, SearchBar } from "@/components/core";
import { Grid, GridItem } from "@chakra-ui/react";

export default function SearchHeader() {
  return (
    <Grid templateColumns={"repeat(10,1fr)"}>
      <GridItem colSpan={2}>
        <Logo />
      </GridItem>
      <GridItem colSpan={6}>
        <SearchBar />
      </GridItem>
      <GridItem colSpan={2}>

      </GridItem>
    </Grid>
  )
}