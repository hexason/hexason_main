import { useAddress } from "@/context/AddressContext"
import { UserAddress } from "@/lib/types"
import { Badge, Box, HStack, Stack, Text } from "@chakra-ui/react"

export const AddressList = () => {
  const { address: selectedAddress, allAddress, actions: { setAddress } } = useAddress();

  const clickHandle = (data: UserAddress) => {
    setAddress(data);
  }

  return (
    <Stack>
      <Text>Хаяг</Text>
      {allAddress.map(address => (
        <HStack border="1px solid #000" p={3} cursor={"pointer"} onClick={() => clickHandle(address)} key={address.id}>
          <Stack>
            <Box>{address.address_city}, {address.address_district}, {address.address_street}, {address.address_info}</Box>
          </Stack>
          <Stack>
            <Box>{address.contact_email}, {address.contact_phone}</Box>
          </Stack>
          {
            (selectedAddress?.id === address.id) && <Badge variant={"solid"}>СОНГОСОН</Badge>
          }
        </HStack>
      ))}

    </Stack>
  )
}