import { Grid, GridItem } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { AdminSidebar } from "../core";
import { DefaultAnimate } from "../animation";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <Grid
      w="100%"
      h="100vh"
      overflow={"hidden"}
      templateColumns={{ base: "repeat(1,1fr)", md: "repeat(8, 1fr)" }}
      gap={12}
    >
      <GridItem colSpan={1}>
        <AdminSidebar />
      </GridItem>
      <GridItem overflow={"auto"} colSpan={7} p={1}>
        <DefaultAnimate>{children}</DefaultAnimate>
      </GridItem>
    </Grid>
  );
}
