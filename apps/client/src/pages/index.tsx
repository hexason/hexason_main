import { Container, Divider, Stack } from '@chakra-ui/react'
import axios from 'axios';
import Head from 'next/head';
import BookLibrary from '@/src/components/library/BookLibrary';
import ProductLibrary from '@/src/components/library/ProductLibrary';

export default function Home({ app }: any) {
  return (
    <>
      <Head>
        <title>{app.title}</title>
        <meta property="og:url" content="https://hexason.com" />
        <meta property="og:title" content={app.title} />
        <meta property="og:description" content={app.description} />
        <meta property="og:image" content="https://scontent.fuln6-1.fna.fbcdn.net/v/t39.30808-6/330797995_516059910647704_2620251664384262155_n.png?_nc_cat=106&ccb=1-7&_nc_sid=e3f864&_nc_ohc=RJk8A8UjVp0AX_alyqw&_nc_ht=scontent.fuln6-1.fna&oh=00_AfAB0K4YGMzdTe3SHvSXgGfEX1waXBz2QbDe7CsnFcEd8w&oe=6420875B" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container mt="10px" minW="100%">
        <Stack>
          <BookLibrary />
          <Divider />
          <ProductLibrary />
        </Stack>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  const app = await axios({
    method: "get",
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    url: "/init"
  }).then(res => res.data).catch(e => ({
    title: "Undermaintain",
    description: "Sorry, we are undermaintain, please try again later."
  }));
  return {
    props: {
      app
    },
  };
}