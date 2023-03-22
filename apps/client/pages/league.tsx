import BookLibrary from "@/src/components/library/BookLibrary";
import Reader from "@/src/components/Reader";
import axios from "axios";
import { NextPageContext } from "next";
import Head from "next/head";

export default function League({ data }: any) {
  if (!data) return (
    <>
      <Head>
        <title>Book Library</title>
      </Head>
      <BookLibrary />
    </>
  )
  return <>
    <Head>
      <title>{data.title.replace(/<\/?[^>]+(>|$)/g, "")}</title>
      <meta property="og:type" content="article" />
      <meta property="og:title" content={data.title.replace(/<\/?[^>]+(>|$)/g, "")} />
      <meta property="og:description" content={data.context.replace(/<\/?[^>]+(>|$)/g, "").toLowerCase().split(" ").slice(0,10).join(" ")} />
      <meta property="og:image" content={data.coverImage} />
    </Head>
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