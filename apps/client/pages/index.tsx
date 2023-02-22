import { Container, Center, Grid, Skeleton, Box } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import ProductCard from '@/src/components/other/ProductCard'
import { Product } from '@/src/interface/product';
import { useAxios } from '@/src/utils/axiosHook';
import axios from 'axios';
import Head from 'next/head';

export default function Home({ app }: any) {
  const [products, setProducts] = useState<Product[]>([]);
  const { loaded, fetch } = useAxios<{ count: 0, items: Product[] }>("/product", {}, "get");

  useEffect(() => {
    fetch().then((data) => setProducts(data.items));
  }, []);

  return (
    <>
      <Head>
        <title>{app.title}</title>
        <meta property="og:url" content="https://hexason.com" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={app.title} />
        <meta property="og:description" content={app.description} />
        <meta property="og:image" content="http://file.firebat.com.cn/FtGLwoPAAjEhy9IB43xcSdVxi6bE" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container mt="10px" minW="100%">
        {/* <Hero /> */}
        <Center>
          <Grid w="100%" templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]} gap={6}>
            {
              loaded ? products.map((item: any) => <ProductCard w={"100%"} key={item.id} data={item} />) : [1, 2, 3, 4, 5, 6].map((_, i) => <Skeleton className="fade-out" key={"s" + i}>
                <Box w="100%" h="400px">
                </Box>
              </Skeleton>
              )}
          </Grid>
        </Center>
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