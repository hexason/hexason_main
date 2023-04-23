import { Divider, Grid, Heading, Stack, Text } from "@chakra-ui/react";
import ImageCard from "../cards/ImageCard";
import { useState } from "react";

export default function ProjectList() {
  const [projects] = useState([
    {
      title: "Pointes",
      description: "Хайсан бүхнээ эндээс олоорой",
      href: "/shop",
      src: "https://www.skunexus.com/hubfs/essential-ecommerce-website-tools.jpg"
    },
    {
      title: "Чөлөөт булан",
      description: "Сонирхолтой тоглоомын ертөнцөд уусаарай",
      href: "/game",
      src: "https://upload.wikimedia.org/wikipedia/en/d/da/KDA.png"
    },
    {
      title: "ZTH16",
      description: "Хөгжүүлэгч бэлтгэх хөтөлбөр",
      href: "/zth16/basic",
      src: "https://unity.com/sites/default/files/styles/16_9_l_scale_width/public/2022-02/learning-journey-810x455%401x.jpg?itok=Plw3_1K2"
    },
  ]);

  return (
    <Stack spacing={6}>
      <Heading>Төсөл, Бүтээгдэхүүн</Heading>
      <Grid
        templateColumns={["repeat(1,1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
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
  )
}