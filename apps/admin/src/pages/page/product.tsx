import TableList from "@/components/build/product/TableList";
import { Box } from "@chakra-ui/react";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import axios from "axios";

export default function ProductPage({ products }: any) {
  return (
    <Box>
      <TableList products={products.items} />
    </Box>
  )
}

export const getServerSideProps = async (ctx: any) => {
  // Create authenticated Supabase Client
  const supabase = createPagesServerClient(ctx)
  // Check if we have a session
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
    return {
      props: {
        initialSession: session,
        user: session?.user,
        products: res.data
      },
    }
  } catch (e) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
}