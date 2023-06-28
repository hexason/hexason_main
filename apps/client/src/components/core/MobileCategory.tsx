import { getCategoryTree } from "@/lib/Services";
import { useQuery } from "@apollo/client";
import { ThreeDotsWave } from "../animation";
import { Box, Grid, Stack } from "@chakra-ui/react";
import Image from "next/image";
import { ContainerStyle } from "@/theme/common";
import { useRouter } from "next/navigation";

export const MobileCategory = () => {
  const { data, loading } = useQuery(getCategoryTree);
  const router = useRouter()

  const redirectPage = (title: string) => {
    router.push("/shop?provider=taobao&s=" + title)
  }

  if (loading) return <ThreeDotsWave />
  return (
    <Grid display={{ base: "grid", md: "none" }} gap={5} templateColumns={"repeat(2, 1fr)"}>
      {data.getCategoryTree.slice(0, 4).map((el: any) => (
        <Stack onClick={() => redirectPage(el.title)} {...ContainerStyle} key={el.id} alignItems={"center"}>
          <Image width={50} height={50} unoptimized src={el.icon} alt="test" />
          <Box fontSize={"sm"}>
            {el.title}
          </Box>
        </Stack>
      ))}
    </Grid>
  )
}
