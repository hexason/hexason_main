"use client";
import { gql, useQuery } from "@apollo/client"
import { ThreeDotsWave } from "@/components/animation";

export default function Page() {
  const { data, loading } = useQuery(gql`
      query {
        getProducts {
          items {
            title
          }
        }
      }
      `);

  if (loading) return <ThreeDotsWave />
  return (
    <>{data.getProducts.items.map((el: any) => <div key={el.title}>{el.title}</div>)}</>
  )
}