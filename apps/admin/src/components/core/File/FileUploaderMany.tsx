import { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Image, Input, Stack, Wrap, useToast } from "@chakra-ui/react";
import { Queue } from "@/lib/queue";
import { TrashIcon } from "@/assets/icons";

export type ImageUploadManyType = { name: string, url?: string, isUploaded: boolean, file?: File }
export default function FileUploaderMany({ imgs, onChange }: { imgs?: ImageUploadManyType[], onChange?: (prop: ImageUploadManyType[]) => any; }) {
  const [images, setImages] = useState<ImageUploadManyType[]>(imgs || []);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (onChange) onChange(images);
  }, [onChange, images])

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
      .then((data) => {
        return data.data.url;
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

  const runner = () => {
    if (loading) return;
    setLoading(true);
    const logger = async (img: ImageUploadManyType) => {
      if (!img.file) return img;
      const url = await handleUploadClick(img.file);
      img.url = url;
      img.isUploaded = true;
      return img;
    }
    const files = new Queue<ImageUploadManyType, ImageUploadManyType[]>(images.filter(m => !m.isUploaded), logger)
    const listener = files.start();
    listener.on("progress", ({ data }) => {
      if (!data) return;
      setImages(prev => {
        const newList = prev.filter(e => e.name !== data.name);
        return [...newList, data]
      });
    })
    listener.on("end", () => {
      setLoading(false);
    })
  }

  const handleUploader = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    for (let i = 0; i < e.target.files.length; i++) {
      setImages((prev) => {
        if (!e.target.files) return prev;
        return [...prev, { name: e.target.files[i].name, url: "", isUploaded: false, file: e.target.files[i] }]
      });
    }
  }

  const removeImage = (name: string) => {
    setImages(prev => {
      const newImages = prev.filter(is => is.name !== name);
      return newImages;
    })

  }

  return (
    <>
      {images.find(i => !i.isUploaded) ? <Button onClick={runner} colorScheme="black" isLoading={loading}>Upload</Button> : null}
      <Wrap>
        {images.map(e => <Box
          key={e.url}
          margin="0"
          w="75px"
          position={"relative"}
          className="hover-overlay-show"
        >
          <Image w="75px" src={e.url} alt={e.name} />
          <Stack className="overlay-image" top={0} position={"absolute"} w="100%" h="100%" bg="#0000007B">
            <Button onClick={() => removeImage(e.name)} colorScheme="red"><TrashIcon height={20} fill={"white"} /></Button>
          </Stack>
        </Box>)}
        <Button colorScheme="blackAlpha" position={"relative"}>
          +
          <Input
            type="file"
            height="100%"
            width="100%"
            position="absolute"
            top="0"
            left="0"
            opacity="0"
            aria-hidden="true"
            accept="image/*"
            multiple
            onChange={handleUploader} />
        </Button>

      </Wrap>
    </>
  )
}