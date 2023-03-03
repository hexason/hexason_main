import { Box, Divider, Heading, Image, Stack, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import 'react-quill/dist/quill.snow.css';

export default function Reader({ data }: any) {
  const [paragraph, setParagraph] = useState([])
  useEffect(() => {
    setParagraph(data.context.split("<p><br></p>"))    
  }, []);

  return (
    <Box backgroundImage={"url(https://img.freepik.com/free-photo/vintage-grunge-paper-background_1048-10911.jpg?w=2000)"}>
      <Stack spacing={"5"} p="6" bg="rgba(255,255,255,0.3)" w="100%" h="100%">
        <Heading fontFamily={"Troubleside"} textAlign={"center"} dangerouslySetInnerHTML={{ __html: data.title }} />
        <Divider borderColor={"black"} />
        {paragraph.map((text, i) => (
          <Box key={Math.random().toString() + i}>
            <Text fontFamily={"Troubleside"} fontSize={"20px"} lineHeight="taller" dangerouslySetInnerHTML={{ __html: text }} />
            {data.images[i] ? <Image src="https://media.discordapp.net/attachments/834086552945688596/835180032179568660/unknown.png" /> : null}
          </Box>
        ))}
      </Stack>
    </Box>
  )
}
