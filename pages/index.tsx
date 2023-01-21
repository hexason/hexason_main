import { Container, Center, Grid, Image, List, ListItem, ListIcon, Button, Text, Flex, Stack, Divider } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Card from '../src/components/Other/Card'
import Hero from '../src/components/Other/Hero'
import axios from "axios"
import BuyModal from '../src/components/Modals/BuyProductModal'
import { IoCheckbox, IoMap, IoTime } from 'react-icons/io5'
import { useUser } from '../src/context/UserContext'
import { BsCurrencyDollar } from 'react-icons/bs'
import { useCurrencyFormat } from '../src/utils/CurrencyFormat'

export default function Home() {
  const [products, setProducts] = useState([])
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const onClose = () => setIsOpen(false);
  const { user } = useUser();
  const formatter = useCurrencyFormat()

  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://cubezet-hfnf.vercel.app/product',
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
    })
  }, [])
  return (
    <>
      <Container mt="10px" minW="100%">
        {user.id ? <></> : <Hero />}
        <Center>
          <Grid w="100%" templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]} gap={6}>
            {products.map((item: any) => <Card w={"100%"} key={item.id} data={item} />)}
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
                <Button colorScheme={"green"} onClick={() => { alert("ok") }}>Buy now</Button>
              </Stack>
            </Center>
            {/* <Card data={selectedProduct} /> */}
          </BuyModal>
        </Center>
      </Container>
    </>
  )
}