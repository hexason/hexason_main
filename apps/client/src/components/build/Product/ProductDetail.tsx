"use client";
import { useCurrencyFormat } from '@/hooks/userCurrencyFormatter'
import { AspectRatio, Avatar, Box, Button, Container, Divider, Grid, GridItem, HStack, Input, InputGroup, InputLeftAddon, InputRightAddon, Stack, Tag, Text, Wrap } from '@chakra-ui/react'
import Image from 'next/image'
import { ProductI } from 'pointes'
import { useState } from 'react';
import ZoomImage from "../../core/Image/ZoomImage"
import { gql, useQuery } from '@apollo/client';
import { ThreeDotsWave } from '@/components/animation';
import { useParams } from 'next/navigation';

export default function ProductDetail() {
  const formatter = useCurrencyFormat();
  const [configs] = useState<{ [key: string]: any[] }>({});
  const { id } = useParams();
  const { loading, data } = useQuery<{ getProductById: ProductI }>(gql`
    {
      getProductById (id: "${id}"){
        id,
        title,
        price,
        supplier {
          logo
        },
        images {
          url
        },
        image
      }
    }
  `)

  if (loading) return <ThreeDotsWave />

  return (
    <Container maxW="container.xl" my={3}>
      <Stack spacing={6} bg="#ffffffAB" p="3" borderRadius={"20px"}>
        <Grid gap="3" templateColumns={["repeat(1,1fr)", "repeat(6, 1fr)"]}>
          <GridItem colSpan={2} as={Stack}>
            <AspectRatio position={"relative"} ratio={1} borderRadius={"20px"} overflow={"hidden"}>
              <Box position={"absolute"} w="100%">
                <ZoomImage
                  img={data?.getProductById.image}
                  zoomScale={3}
                  width={379}
                  height={379}
                />
              </Box>
            </AspectRatio>
          </GridItem>
          <GridItem as={Stack} p={3} colSpan={3}>
            <Stack h="100%" spacing={6}>
              <Stack>
                <Text color="black" fontSize={"1.5rem"} fontWeight={"bold"}>{data?.getProductById.title}</Text>
                {data?.getProductById.sold && <Text fontSize={"1rem"} opacity={"0.5"}>{formatter(data?.getProductById.sold, "short")} зарагдсан</Text>}
                <Tag fontWeight={"bold"} textTransform={"uppercase"} p={3}>
                  <Avatar mr={3} src={data?.getProductById.supplier.logo} size={"sm"} />
                  {data?.getProductById.supplier.name}
                </Tag>
                <HStack spacing={"10px"}>
                  <Text fontSize={"1.5rem"} color='green'>{formatter(data?.getProductById.price || 0, "short")} ₮</Text>
                  <Tag fontSize={"1.2rem"} colorScheme='teal'>Гишүүн: {formatter((data?.getProductById.price || 0) * 0.9, "short")}</Tag>
                </HStack>
              </Stack>
              <Stack color={"gray.600"}>
                {
                  Object.keys(configs).map(key => {
                    return (
                      <Stack key={key} alignItems={"start"}>
                        <Text w="150px">{key}:</Text>
                        <Wrap>
                          {configs[key].map(item => <Tag key={item._id} colorScheme='teal' mr={2}>{item.altTxt}</Tag>)}
                        </Wrap>
                      </Stack>
                    )
                  })
                }
                <Stack>
                  <Text w="150px">Тоо ширхэг:</Text>
                  <QuantityController />
                </Stack>
              </Stack>
              <Box borderRadius="20px" overflow={"hidden"} w={["100%", "300px"]}>
                <Button w="50%" colorScheme='teal' borderRadius={"0"}>Сагслах</Button>
                <Button w="50%" colorScheme='green' borderRadius={"0"}>Шууд захиалах</Button>
              </Box>
            </Stack>
          </GridItem>
          <GridItem colSpan={1}>
            <Stack h="100%" borderRadius={"5px"} bg="gray.200">

            </Stack>
          </GridItem>
        </Grid>

        <Divider />

        <Stack alignItems={"center"} spacing={"0"}>
          {data?.getProductById.images.map((img: any) => <Image width={600} height={400} unoptimized key={img._id} src={img.url} alt={data?.getProductById.title + img._id} />)}
        </Stack>
      </Stack>
    </Container>
  )
}

const QuantityController = (props: any) => {
  const [quant, setQuant] = useState(0);
  const handleInputChanger = (e: any) => {
    let value = e.target.value;
    if (value.length > 0) {
      value = value.replace(/[^0-9]/g, '');
      setQuant(parseInt(value) > 0 ? parseInt(value) : 1);
      return;
    } else {
      setQuant(1);
    }
  }
  const addRemoveHandler = (indicator: number) => {
    setQuant(prev => (prev + indicator > 0 ? prev + indicator : 1));
  }

  return (
    <InputGroup {...props}>
      <InputLeftAddon color="white" onClick={() => addRemoveHandler(-1)} as={Button} bg="#000" >-</InputLeftAddon>
      <Input onChange={handleInputChanger} value={quant} w="50px" _focus={{ w: "100px" }} />
      <InputRightAddon color="white" onClick={() => addRemoveHandler(1)} bg="#000" as={Button}>+</InputRightAddon>
    </InputGroup>
  )
}