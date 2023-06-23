"use client";
import { useQuery } from "@apollo/client";
import { ThreeDotsWave } from "@/components/animation";
import { getProduct } from "@/lib/Services";

export default function Page() {
  const { data, loading } = useQuery(getProduct);

  if (loading) return <ThreeDotsWave />;
  return (
    <>
      {data.getProducts.items.map((el: any) => (
        <div key={el.title}>{el.title}</div>
      ))}
    </>
  );
}
