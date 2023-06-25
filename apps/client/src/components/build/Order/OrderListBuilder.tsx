"use client";
import { Box } from "@chakra-ui/react";
import { OrderList } from "./OrderList";
import { OrderListMobile } from "./OrderListMobile";
import { ThreeDotsWave } from "@/components/animation";
import { NotFound } from "@/components/core/NotFound";
import { getOrdersGQL } from "@/lib/Services";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export const OrderListBuilder = () => {
  const { loading, data, refetch } = useQuery<any>(getOrdersGQL);
  const pathname = usePathname()

  useEffect(() => {
    refetch();
  }, [pathname])

  if (loading) return <ThreeDotsWave />;
  if (!data) return <NotFound />;
  return (
    <>
      <Box w="100%" display={{ base: "none", md: "flex" }}>
        <OrderList data={data} />
      </Box>
      <Box w="100%" display={{ base: "flex", md: "none" }}>
        <OrderListMobile data={data} />
      </Box>
    </>
  );
};
