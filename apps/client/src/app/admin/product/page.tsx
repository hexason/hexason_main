import { TableList } from "@/components/build";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function ProductPage() {
  const supabase = createServerComponentClient({ cookies });
  let products: any = [];

  const {
    data: { session },
  } = await supabase.auth.getSession();

  try {
    const res = await fetch(
      new URL(
        "product/list",
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      ),
      {
        method: "GET",
        headers: {
          authorization: "Bearer " + session?.access_token,
        },
        cache: "no-cache",
      }
    );
    products = await res.json();
  } catch (e) {
    console.log(e);
  }

  return <TableList products={products.items} />;
}
