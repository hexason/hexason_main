import { Grid, GridItem } from "@chakra-ui/react";
import {
  Sidebar,
  Navbar,
  DefaultAnimate
} from "../core";

export const LayoutBuilder = ({ children }: any) => {
  return (
    <Grid
      w="100%" bg="#28243D" h="100vh"
      overflow={"hidden"}
      color="gray.200"
      templateColumns={{ base: "repeat(1,1fr)", md: "repeat(8, 1fr)" }} gap={12}>
      <GridItem colSpan={1}>
        <Sidebar />
      </GridItem>
      <GridItem overflow={"auto"} colSpan={7} p={1}>
        <Navbar />
        <DefaultAnimate>
          {children}
        </DefaultAnimate>
      </GridItem>
    </Grid>
  )
}
