"use client"
import { ThreeDotsWave } from "@/components/animation";
import { ProductDetail } from "@/components/build";
import { NotFound } from "@/components/core/NotFound";
import { getProductById } from "@/lib/Services";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams();
  const { loading, data } = useQuery<{ getProductById: any }>(
    getProductById(id)
  );

  if (loading) return <ThreeDotsWave />;
  if (!data) return <NotFound />
  return <ProductDetail product={data?.getProductById} />
}