import BookLibrary from "@/src/components/BookLibrary";
import Reader from "@/src/components/Reader";
import axios from "axios";
import { NextPageContext } from "next";

export default function League({ data }: any) {
  if (!data) return <BookLibrary />
  return <>
    <Reader data={data} />
  </>
}

export async function getServerSideProps(context: NextPageContext) {
  const id = context.query.id;
  let data = null;

  if (id) data = await axios({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    method: "get",
    url: `/book/${id}/detail`
  }).then(response => response.data).catch((err) => null)

  return {
    props: {
      data
    }
  }
}