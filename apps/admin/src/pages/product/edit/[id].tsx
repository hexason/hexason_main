import ProductEditor from "@/components/ProductEditor";
import axios from "axios"
import { NextPageContext } from "next"

export default function ProductDetail({ product }: any) {
  if (!product) return <>Not Found</>
  console.log(product)
  return <>
   <ProductEditor product={product} />
  </>
}

export async function getServerSideProps(context: NextPageContext) {
  const product = await axios({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    url: "/product/" + context.query.id,
  }).then(response => response.data).catch(() => null);

  return {
    props: {
      product
    }
  }
}