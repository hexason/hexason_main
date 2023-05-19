import { ProductDetail } from "@/components/build";
import axios from "axios";

export default async function Page({ params }: any) {
  const productData = await axios({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    url: "product/" + params.id
  }).then(({ data }) => data);

  return <ProductDetail product={productData} />
}