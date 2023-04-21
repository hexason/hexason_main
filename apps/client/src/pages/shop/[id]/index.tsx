import ProductDetail from '@/components/core/Product/ProductDetail';
import axios from 'axios';
import { useRouter } from 'next/router';
import { ProductI } from 'pointes';
import { useEffect, useState } from 'react';

export default function ProductDetailPage() {
  const [product, setProduct] = useState<ProductI | null>(null);
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    axios({
      method: "get",
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      url: "product/" + router.query.id
    }).then(({ data }) => setProduct(data)).catch(e => setProduct(null));
  }, []);

  if (!product) return <>Not found</>
  return (
    <>
      <ProductDetail product={product} />
    </>
  )
}