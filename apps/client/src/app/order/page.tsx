"use client";
import { ThreeDotsWave } from "@/components/animation";
import { OrderListBuilder } from "@/components/build";
import { AddressFormEdit } from "@/components/core/AddressFormEdit";
import { NotFound } from "@/components/core/NotFound";
import { getOrdersGQL } from "@/lib/Services";
import { useQuery } from "@apollo/client";

export default function Page() {
  const { loading, data } = useQuery<any>(getOrdersGQL);

  if (loading) return <ThreeDotsWave />;
  if (!data) return <NotFound />;
  return (
    <>
      <AddressFormEdit />
      <OrderListBuilder data={data} />
    </>
  );
}
