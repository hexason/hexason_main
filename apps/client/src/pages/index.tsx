import { Divider, Grid, Heading, Stack, Text } from '@chakra-ui/react';
import axios from 'axios';
import Head from 'next/head';
import ImageCard from '../components/cards/ImageCard';
import { useState } from 'react';
import DefaultAnimate from '@/components/animation/DefaultAnimate';

export default function Home({ app }: any) {
  const [courses] = useState([
    {
      title: "ZTH16",
      description: "Zero To Hero",
      href: "/zth16/basic",
      src: "https://unity.com/sites/default/files/styles/16_9_l_scale_width/public/2022-02/learning-journey-810x455%401x.jpg?itok=Plw3_1K2"
    },
    {
      title: "ZTH16",
      description: "Crypto Finance",
      href: "/zth16/crypto",
      src: "https://cdn.corporatefinanceinstitute.com/assets/cryptocurrency.jpg"
    },
    {
      title: "ZTH16",
      description: "Game Development",
      href: "/zth16/game",
      src: "https://itchronicles.com/wp-content/uploads/2021/04/Optimized-Illustration-from-Adobe-Stock-for-ITC-Post-on-AI-in-Game-Development-1024x576.jpeg.webp"
    },
  ])
  const [projects] = useState([
    {
      title: "Game Area",
      description: "Virtaul Entertainment Area",
      href: "/game",
      src: "https://upload.wikimedia.org/wikipedia/en/d/da/KDA.png"
    },
    {
      title: "Hexy",
      description: "GPT based Bot",
      href: "/support",
      src: "https://cdn.discordapp.com/attachments/960216281993322606/1098000261672349696/hexy.webp"
    },
    {
      title: "Pointes",
      description: "Online Ecommerce All in One",
      href: "/shop",
      src: "https://www.skunexus.com/hubfs/essential-ecommerce-website-tools.jpg"
    }
  ])
  return (
    <>
      <Stack
        as={DefaultAnimate}
        alignItems={"center"}
        minH="100vh"
        py={6}
        w="100%">
        <Heading>Сургалт, Хөтөлбөр</Heading>
        <Grid
          templateColumns={["repeat(1,1fr)", "repeat(2, 1fr)","repeat(3, 1fr)"]}
          gap={6}
        >
          {courses.map(e => (
            <ImageCard
              key={e.title}
              src={e.src}
              href={e.href}
            >
              <Stack textAlign={"center"}>
                <Heading color={"#fffffffB"}>
                  {e.title}
                </Heading>
                <Divider />
                <Text color="gray.400" fontSize={"2xl"}>{e.description}</Text>
              </Stack>
            </ImageCard>
          ))}
        </Grid>
        <Heading>Төсөл, Бүтээгдэхүүн</Heading>
        <Grid
          templateColumns={["repeat(1,1fr)", "repeat(2, 1fr)","repeat(3, 1fr)"]}
          gap={6}
        >
          {projects.map(e => (
            <ImageCard
              key={e.title}
              src={e.src}
              href={e.href}
            >
              <Stack textAlign={"center"}>
                <Heading color={"#fffffffB"}>
                  {e.title}
                </Heading>
                <Divider />
                <Text color="gray.400" fontSize={"2xl"}>{e.description}</Text>
              </Stack>
            </ImageCard>
          ))}
        </Grid>
      </Stack>
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