import { TableList } from "@/components/build";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers"
import axios from "axios";

export default async function ProductPage() {
  const supabase = createServerComponentClient({ cookies })
  let products: any = []

  const {
    data: { session },
  } = await supabase.auth.getSession()

  try {
    const res = await axios({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      url: "product/list",
      method: "get",
      headers: {
        Authorization: "Bearer " + session?.access_token
      }
    })
    products = res.data
  } catch (e) {
    console.log(e)
  }

  return (
    <TableList products={products.items} />
  )
}