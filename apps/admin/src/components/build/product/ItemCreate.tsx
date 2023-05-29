import { useAxios } from "@/hooks/useAxios";
import { Box, Button, Input, Popover, PopoverContent, PopoverTrigger, Stack, Td, Tr } from "@chakra-ui/react";
import { useState } from "react";

export default function ItemCreate({ productId, onChange }: { productId: string, onChange?: any }) {
  const [item, setItem] = useState({
    altTxt: "red",
    configName: "color",
    image: "",
    price: 1000,
    product: productId,
    sku: Date.now().toString(32),
    status: 12,
    stock: 10,
    upc: "1234"
  });
  const [loading, setLoading] = useState(false);
  const axios = useAxios();

  const addItem = async () => {
    setLoading(true);
    await axios({
      method: "put",
      url: `product/${item.product}/item`,
      data: {
        ...item,
        price: +item.price,
        stock: +item.stock,
      }
    }).then(({ data }) => onChange(data)).catch(console.log);
    setLoading(false);
  }

  function handleChange(e: any) {
    const { name, value } = e.target;
    setItem((prevItem: any) => ({ ...prevItem, [name]: value }));
  }

  return (
    <Tr>
      <Td>
        <Stack>
          <Box>
            {item.sku}
          </Box>
          <CustomPopover name={"upc"}>
            <Input name="upc" value={item.upc} onChange={handleChange} />
          </CustomPopover>
        </Stack>
      </Td>
      <Td>
        <Stack>
          <CustomPopover name={item.configName}>
            <Input name="configName" value={item.configName} onChange={handleChange} />
          </CustomPopover>
          <CustomPopover name={"Description"}>
            <Input name="altTxt" value={item.altTxt} onChange={handleChange} />
          </CustomPopover>
        </Stack>
      </Td>
      <Td>
        <CustomPopover name={"price"}>
          <Input name="price" value={item.price} onChange={handleChange} />
        </CustomPopover>
        <CustomPopover name={"stock"}>
          <Input name="stock" value={item.stock} onChange={handleChange} />
        </CustomPopover>
      </Td>
      <Td>
        <Stack>
          <Button isLoading={loading} onClick={addItem}>+</Button>
        </Stack>
      </Td>
    </Tr>
  )
}

const CustomPopover = ({ name, children }: any) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button>{name}</Button>
      </PopoverTrigger>
      <PopoverContent>
        {children}
      </PopoverContent>
    </Popover>
  )
}