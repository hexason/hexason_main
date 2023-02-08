import { Container, Center, Grid, Image, List, ListItem, ListIcon, Button, Text, Stack, Divider, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Card from '../src/components/other/Card'
import Hero from '../src/components/other/Hero'
import axios from "axios"
import BuyModal from '../src/components/modals/BuyProductModal'
import { IoCheckbox, IoMap, IoTime } from 'react-icons/io5'
import { BsCurrencyDollar } from 'react-icons/bs'
import { useCurrencyFormat } from '../src/utils/CurrencyFormat'
import { supabase } from '../src/lib/Store'
import { useUser } from '../src/context/UserContext'
import Link from 'next/link'
import InvestorPartners from '../src/components/other/InvestorPartners'

export default function Home() {
  const [products, setProducts] = useState([])
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const onClose = () => setIsOpen(false);
  const formatter = useCurrencyFormat();
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const { refreshSession } = useUser();
  const toast = useToast();

  const handleBuyButton = async (id: string) => {

    setLoading(true);
    const token = await supabase.auth.getSession();
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/product/${id}/buy`, {}, {
      headers: {
        Authorization: `Bearer ${token.data.session?.access_token}`
      }
    })
      .then(({ data }) => {
        if (refreshSession) refreshSession();
        toast({
          title: "Product purchased",
          description: <Text>You have successfully purchased the product. Now you can see it in your <Text textDecoration={"underline"} cursor={"pointer"} color="blue" as={Link} href="/user">Profile</Text></Text>,
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top"
        })
      }).catch((err) => {
        toast({
          title: "Error",
          description: err.response ? err.response.data.message : "Something went wrong",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top"
        })
      }).finally(() => setLoading(false));
  }

  useEffect(() => {
    axios({
      method: 'get',
      url: process.env.NEXT_PUBLIC_API_URL + '/product',
    }).then(({ data }) => {
      setProducts(data.map((product: any) => {
        return {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          description: product.description,
          salePrice: product.salePrice,
          sold: product.sold,
          trigger: () => {
            setSelectedProduct(product);
            setIsOpen(true);
          }
        }
      }));
      setTimeout(() => {
        setIsLoaded(true);
      }, 1000);
    })
  }, [])
  return (
    <>
      <Container mt="10px" minW="100%">
        {/* <Hero /> */}
        <Center>
          <Grid w="100%" templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]} gap={6}>
            {
              products.map((item: any) => <Card isLoaded={isLoaded} w={"100%"} key={item.id} data={item} />)
            }
          </Grid>
        </Center>
      </Container>
    </>
  )
}