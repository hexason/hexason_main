import { getCategoryTree } from "@/lib/Services";
import { useQuery } from "@apollo/client";
import { ThreeDotsWave } from "../animation";
import { Box, Grid, Stack } from "@chakra-ui/react";
import Image from "next/image";
import { ContainerStyle } from "@/theme/common";

export const MobileCategory = () => {
  const { data, loading } = useQuery(getCategoryTree);

  if (loading) return <ThreeDotsWave />
  return (
    <Grid display={{ base: "grid", md: "none" }} gap={5} templateColumns={"repeat(2, 1fr)"}>
      {data.getCategoryTree.slice(0, 4).map((el: any) => (
        <Stack {...ContainerStyle} key={el.id} alignItems={"center"}>
          <Image width={50} height={50} unoptimized src={el.icon} alt="test" />
          <Box fontSize={"sm"}>
            {el.title}
          </Box>
        </Stack>
      ))}
    </Grid>
  )
}