import {
  AspectRatio,
  Box,
  Container,
  Heading,
  Input,
  Stack,
  Text,
  useToast
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function FileUploader({ src, onChange }: { src?: string, onChange?: (url: string) => any }) {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("https://image.shutterstock.com/image-photo/paella-traditional-classic-spanish-seafood-600w-1662253543.jpg");
  const toast = useToast();

  useEffect(() => {
    if (src) setUrl(src);
  }, [src])

  const handleUploadClick = async (file: File | null) => {
    if (!file) {
      return "error";
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('image', file);
    return await fetch('https://api.imgbb.com/1/upload?key=b96681fa75ea775b33dc015c1a45ad81', {
      method: 'POST',
      body: formData,
    }).then((res) => res.json())
      .then(async (data) => {
        setLoading(false);
        setUrl(data.data.url);
        if (onChange) onChange(data.data.url)
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: "File upload error",
          status: "error",
          duration: 4000,
          isClosable: true
        })
        return err.message
      });
  };

  return (
    <Container my="12">
      <AspectRatio width="100%" ratio={1}>
        <Box
          borderColor="gray.300"
          borderStyle="dashed"
          borderWidth="2px"
          rounded="md"
          shadow="sm"
          role="group"
          transition="all 150ms ease-in-out"
          className="hover-overlay-show"
          as={motion.div}
        >
          <Box position="relative" height="100%" width="100%">
            <Box
              position="absolute"
              as={motion.div}
              top="0"
              left="0"
              height="100%"
              width="100%"
              display="flex"
              flexDirection="column"
              bg={"#00000081"}
            >
              <Stack
                height="100%"
                width="100%"
                display="flex"
                alignItems="center"
                justify="center"
                spacing="4"
                backgroundSize={"contain"}
                backgroundRepeat={"no-repeat"}
                backgroundPosition={"center"}
                backgroundImage={`url(${url})`}
              >
                <Stack className="overlay-image"
                  transition={"0.3s"} w="100%" h="100%" bg={"#00000081"}>
                  <Stack p="8" textAlign="center" spacing="1">
                    <Heading fontSize="lg" color="gray.400" fontWeight="bold">
                      Drop images here
                    </Heading>
                    <Text fontWeight="light">or click to upload</Text>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
            <Input
              isDisabled={loading}
              type="file"
              height="100%"
              width="100%"
              position="absolute"
              top="0"
              left="0"
              opacity="0"
              aria-hidden="true"
              accept="image/*"
              onChange={(e) => handleUploadClick(e.target.files ? e.target.files[0] : null)}
            />
          </Box>
        </Box>
      </AspectRatio>
    </Container>
  );
}
