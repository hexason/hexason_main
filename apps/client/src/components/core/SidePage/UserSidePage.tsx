import { useAuth } from "@/context/AuthContext"
import { useCurrencyFormat } from "@/hooks"
import { Avatar, Box, Button, Divider, Grid, HStack, Image, Stack, Tag, Text } from "@chakra-ui/react"
import Link from "next/link"

const data = [
  {
    url: "/",
    src: "/icons/logistic.svg",
    text: "Хүргэлт, ложистик"
  },
  {
    url: "/",
    src: "/icons/online_payment.svg",
    text: "Төлбөрийн систем"
  },
  {
    url: "/shop",
    src: "/icons/tourist_map.svg",
    text: "Худалдаа, Заавар"
  }

]
export const UserSidePage = () => {
  const formatter = useCurrencyFormat();
  const { supabase, session } = useAuth();

  const loginAction = () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: process.env.NEXT_PUBLIC_REDIRECT_URL || "http://localhost:3000"
      }
    })
  }

  return (
    <Stack spacing={6} alignItems={"center"} p={3} h="100%">
      <Stack h="100%" w="100%" alignItems={"center"} position={"relative"}>
        <Box
          w="100%"
          h="100%"
          position={"absolute"}
          backgroundImage={"url(/icons/orange-asia.png)"}
          backgroundPosition={"center"}
          backgroundSize={"contain"}
          backgroundRepeat={"no-repeat"}
          opacity={0.4}
        >
        </Box>
        <Avatar />
        <Tag zIndex={"1"} fontWeight={"bold"} p={3}>{formatter(1000, "short")}₮</Tag>
      </Stack>
      {session?.user ? <HStack textAlign={"center"}>
        <Tag colorScheme="purple" p={1}>Хүргэлтэнд гарсан</Tag>
        <Tag colorScheme="green" p={1}>Хүлээж авсан</Tag>
        <Tag colorScheme="blue" p={1}>Төлбөр хийх</Tag>
      </HStack> : <HStack>
        <Button onClick={loginAction} colorScheme="green">Login with Google</Button>
      </HStack>}
      <Stack justifyContent={"end"} h="100%" w="100%">
        <Divider />
        <Text fontWeight={"bold"} textAlign={"start"} w="100%">Бусад</Text>
        <Grid gap={3} templateColumns={`repeat(${data.length},1fr)`} w="100%" alignItems={"start"}>
          {data.map((el) => <Link href={el.url} key={el.text}>
            <Image h="40px  " w="100%" src={el.src} />
            <Text fontSize={"14px"}>{el.text}</Text>
          </Link>)}
        </Grid>
      </Stack>
    </Stack>
  )
} 