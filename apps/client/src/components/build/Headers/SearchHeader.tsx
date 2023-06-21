import { Logo, SearchBar } from "@/components/core";
import { Grid, GridItem } from "@chakra-ui/react";
import { BasketWithFavButton } from "../../core/header/BasketWithFavButton";

export default function SearchHeader() {
  return (
    <Grid
      display={{ base: "none", md: "grid" }}
      mt={6}
      gap={4}
      templateColumns={"repeat(10,1fr)"}
    >
      <GridItem colSpan={2}>
        <Logo />
      </GridItem>
      <GridItem colSpan={6}>
        <SearchBar />
      </GridItem>
      <GridItem colSpan={2}>
        <BasketWithFavButton />
      </GridItem>
    </Grid>
  );
}
