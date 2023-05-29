import { TrashIcon } from "@/assets/icons";
import { useAxios } from "@/hooks/useAxios";
import { Box, Button, Input, Popover, PopoverContent, PopoverTrigger, Stack, Td, Tr } from "@chakra-ui/react";
import { useState } from "react";

export default function ItemDetail({ itemData, onChange }: { itemData: any, onChange?: any }) {
  const [item, setItem] = useState(itemData);
  const [loading, setLoading] = useState(false);
  const axios = useAxios();

  const updateItem = async () => {
    setLoading(true);
  }

  const deleteItem = async () => {
    setLoading(true);
    await axios({
      method: "put",
      url: `product/${itemData.product}/item`,
      data: {
        ...itemData,
        status: 1
      }
    }).then(({ data }) => onChange(data))
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
          <Button isLoading={loading} onClick={deleteItem}><TrashIcon height={20} fill="white" /></Button>
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