import { Grid, GridItem } from "@chakra-ui/react";
import Sidebar from "./core/Sidebar";
import Navbar from "./core/Navbar";

export default function LayoutBuilder({ children }: any) {
  return (
    <Grid
      w="100%" bg="#28243D" h="100vh"
      overflow={"hidden"}
      color="gray.200"
      templateColumns={"repeat(8, 1fr)"} gap={12}>
      <GridItem colSpan={1}>
        <Sidebar />
      </GridItem>
      <GridItem colSpan={7} p={1}>
        <Navbar />
        {children}
      </GridItem>
    </Grid>
  )
}
