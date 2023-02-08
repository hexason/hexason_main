import { Container, Center, Grid } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import ProductCard from '@/src/components/other/ProductCard'
import { Product } from '@/src/interface/product';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts([
      {
        id: '1',
        title: 'Zero 2 Figure ',
        image: "https://cdn.shopify.com/s/files/1/0014/2648/9388/products/ultra-tokyo-connection-pvc-scale-figures-chainsaw-man-power-prize-figure-32504714756140_360x.jpg?v=1669223937",
        brand: "Brand 1",
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet lorem. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet lorem.',
        price: 3200000,
        oldPrice: 4000000,
        sold: 10,
        quantity: 10,
        status: 'available',
        airedAt: new Date().toLocaleString(),
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString(),
      },
      {
        id: '2',
        title: 'Zero 2 Figure ',
        image: "https://cdn.shopify.com/s/files/1/0014/2648/9388/products/ultra-tokyo-connection-pvc-scale-figures-chainsaw-man-power-prize-figure-32504714756140_360x.jpg?v=1669223937",
        brand: "Brand 1",
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet lorem. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet lorem.',
        price: 32000,
        oldPrice: 40000,
        sold: 10,
        quantity: 10,
        status: 'available',
        airedAt: new Date().toLocaleString(),
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString(),
      },
    ]);
  }, [])

  return (
    <>
      <Container mt="10px" minW="100%">
        {/* <Hero /> */}
        <Center>
          <Grid w="100%" templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]} gap={6}>
            {
              products.map((item: any) => <ProductCard w={"100%"} key={item.id} data={item} />)
            }
          </Grid>
        </Center>
      </Container>
    </>
  )
}