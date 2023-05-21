import { Logo, SearchBar } from "@/components/core";
import { Box, Grid, GridItem } from "@chakra-ui/react";

export default function SearchHeader() {
  return (
    <Grid mt={3} gap={4} templateColumns={"repeat(10,1fr)"}>
      <GridItem colSpan={2}>
        <Logo />
      </GridItem>
      <GridItem colSpan={6}>
        <SearchBar />
      </GridItem>
      <GridItem colSpan={2}>
        <Box>ad or basket</Box>
      </GridItem>
    </Grid>
  )
}