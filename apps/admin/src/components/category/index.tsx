import { useAxios } from "@/hooks/useAxios";
import { Button, Input, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Stack, Tag, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"

export const CategoryCreator = ({ name, trigger }: { name?: string, trigger?: (data: any) => any }) => {
  const [category, setCategory] = useState({
    name
  });
  const [isTyping, setIsTyping] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const axios = useAxios();
  const toast = useToast();

  const addCategory = async () => {
    setLoading(true);
    await axios({
      method: "post",
      url: "category/create",
      data: category
    }).then(({ data }) => {
      toast({
        title: "Success",
        status: "success",
        description: "",
        isClosable: true,
        duration: 5000
      })
      if (trigger) trigger(data);
    }).catch(() => {
      toast({
        title: "Error",
        status: "error",
        description: "Failed",
        isClosable: true,
        duration: 5000
      })
    });
    setLoading(false);
  }

  const inputHandler = (e: any) => {
    setIsTyping(true);
    setCategory({
      ...category,
      [e.target.name]: e.target.value
    });
    if (isTyping) return;
    setTimeout(() => {
      setIsTyping(false);
    }, 2000);
  }
  useEffect(() => {
    if (isTyping) return
    axios.get("/category/list?s=" + category.name)
      .then(({ data }) => setCategories(data))
  }, [isTyping, axios, category])
  useEffect(() => {
    setCategory(prev => ({
      ...prev,
      name,
    }));
  }, [name])

  return (
    <Popover>
      <PopoverTrigger>
        <Tag cursor={"pointer"}>+</Tag>
      </PopoverTrigger>
      <PopoverContent bg={"transpapent"} border="">
        <PopoverArrow bg={"#000"} />
        <PopoverCloseButton />
        <PopoverHeader borderRadius={"20px 20px 0 0"} bg={"#000"} >
          <Stack bg={"#000"} p="3" borderRadius={"20px"} color="white">
            <Input placeholder="What is your category?" onChange={inputHandler} name={"name"} value={category.name} />
            <Stack>
              {categories.map((e: any) => <Button onClick={() => setCategory({ name: e.name })} colorScheme="blackAlpha" key={e._id}>{e.name}</Button>)}
            </Stack>
          </Stack>
        </PopoverHeader>
        <PopoverBody borderRadius={"0 0 20px 20px"} bg={"#000"}>
          <Stack>
            <Button isLoading={loading} onClick={addCategory} colorScheme="blackAlpha">+</Button>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>

  )
}