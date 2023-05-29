//TODO: add supplier changer
import { Avatar, Button, Select, Stack, useToast } from "@chakra-ui/react"
import { useState } from "react"
/**
 * 
 * @deprecated - don't use this function
 */
export const SupplierChanger = ({ setSupplier }: { setSupplier: any }) => {
  const [txt, setTxt] = useState('');
  const toast = useToast();

  const formSubmit = (e: any) => {
    e.preventDefault();
    if (!txt) {
      toast({
        title: "Supplier is required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setSupplier(txt);
  }
  return (
    <Stack>
      <form onSubmit={formSubmit}>
        <Stack>
          <Select value={txt} onChange={(e) => setTxt(e.target.value)}>
            <option value={""}>
              None
            </option>
            <option value={"64364d4829aeda71de8a6fa6"}>
              <Avatar size={"sm"} src='/logo.png' /> Hexason
            </option>
          </Select>
          <Button colorScheme="blue" border="1px solid #fff" type="submit" borderRadius={"20px"} onClick={() => { }}>Submit</Button>
        </Stack>
      </form>
    </Stack>
  )
}