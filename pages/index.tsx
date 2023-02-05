import { Container, Center, Grid, Image, List, ListItem, ListIcon, Button, Text,  Stack, Divider, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Card from '../src/components/Other/Card'
import Hero from '../src/components/Other/Hero'
import axios from "axios"
import BuyModal from '../src/components/Modals/BuyProductModal'
import { IoCheckbox, IoMap, IoTime } from 'react-icons/io5'
import { BsCurrencyDollar } from 'react-icons/bs'
import { useCurrencyFormat } from '../src/utils/CurrencyFormat'
import { supabase } from '../lib/Store'
import { useUser } from '../src/context/UserContext'
import Link from 'next/link'

export default function Home() {
  const [products, setProducts] = useState([])
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const onClose = () => setIsOpen(false);
  const formatter = useCurrencyFormat();
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const {refreshSession} = useUser();
  const toast = useToast();

  const handleBuyButton = async (id: string) => {
    
    setLoading(true);
    const token =  await supabase.auth.getSession();
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/product/${id}/buy`, {}, {
      headers: {
        Authorization: `Bearer ${token.data.session?.access_token}`
      }
    })
    .then(({data}) => {
      if(refreshSession) refreshSession();
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
      url: process.env.NEXT_PUBLIC_API_URL+'/product',
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
            {products.length === 0 ?
              Array.from({ length: 3 }, () => null).map((_, i) => (
                <Card key={"s" + i} w={"100%"} isLoaded={false} data={{
                  price: 0,
                  title: "...",
                  image: "...",
                  description: "...",
                  id: "...",
                }} />
              ))
              : products.map((item: any) => <Card isLoaded={isLoaded} w={"100%"} key={item.id} data={item} />)
            }
          </Grid>
          <BuyModal isOpen={isOpen} onClose={onClose} price={selectedProduct?.price} title={selectedProduct?.title} >
            <Image src={selectedProduct?.image} />
            <List my={3} spacing={3}>
              <ListItem>
                <ListIcon as={BsCurrencyDollar} color="teal" />
                PME: {selectedProduct?.price * 0.01}$ - {selectedProduct?.price * 0.1}$
              </ListItem>
              <ListItem>
                <ListIcon as={IoTime} color="teal" />
                Duration: Unlimited
              </ListItem>
              <ListItem>
                <ListIcon as={IoCheckbox} color="teal" />
                Potential: 100% verified
              </ListItem>
              <ListItem>
                <ListIcon as={IoMap} color="teal" />
                Field: Space /Stake Based Income/
              </ListItem>
            </List>
            <Divider mb="2" />
            <Center>
              <Stack spacing={3}>
                <Text fontWeight={"bold"} fontSize="24px" textAlign={"center"}>{formatter(selectedProduct?.price)}</Text>
                <Button isLoading={loading} colorScheme={"green"} onClick={() => handleBuyButton(selectedProduct?.id)}>Buy now</Button>
              </Stack>
            </Center>
            {/* <Card data={selectedProduct} /> */}
          </BuyModal>
        </Center>
      </Container>
    </>
  )
}