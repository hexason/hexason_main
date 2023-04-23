import ProductDetail from '@/components/core/Product/ProductDetail';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import { NextSeo } from 'next-seo';

export default function ProductDetailPage({ product }: any) {
  return (
    <>
      <NextSeo
        title={product.title}
        description={product.description}
        canonical="https://www.canonical.ie/"
        openGraph={{
          url: process.env.NEXT_PUBLIC_API_URL + '/product/' + product.id,
          title: product.title,
          description: product.description,
          images: product.images.map((e: any) => ({
            url: e.url,
            alt: e._id,
            width: 800,
            height: 600,
            type: "image/*"
          })),
          siteName: 'Heaxason',
        }}
      />
      <ProductDetail product={product} />
    </>
  )
}

export async function getStaticProps(context: GetServerSidePropsContext) {
  const products = await axios({
    method: "get",
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    url: "product/" + context.params?.id
  });
  const product = products.data;
  return {
    props: {
      product
    },
  };
}

export async function getStaticPaths() {
  const products = await axios({
    method: "get",
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    url: "product/list"
  });
  const { items } = products.data;

  return {
    paths: items.map((item: any) => ({ params: { id: item.id } })),
    fallback: false,
  }
}