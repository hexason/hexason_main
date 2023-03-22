import { Center, Divider, Grid, Heading, Stack, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import BookCard from "../cards/BookCard";

export default function BookLibrary() {
  const [books, setBooks] = useState([]);
  const toast = useToast();
  useEffect(() => {
    axios({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      url: "/book/list",
    }).then(({ data }) => setBooks(data.books)).catch(e => toast({
      title: "Алдаа гарчихлөө",
      description: "Манай серверт ямар нэг зүйл болжээ. Удахгүй засагдчина хүлээгээрэй",
      status: "error",
      isClosable: true,
      duration: 5000
    }))
  }, []);

  return (
    <Stack>
      <Heading>Тоглоомын өгүүлэл</Heading>
      <Grid templateColumns={["repeat(1,1fr)", "repeat(2,1fr)", "repeat(4, 1fr)"]} gap={6}>
        {books.map((el: any) => <BookCard title={el.title} coverImage={el.coverImage} id={el.id} key={el.id} />)}
      </Grid>
    </Stack>
  )
}