import { useModal } from "@/src/context/ModalContext";
import { useUser } from "@/src/context/UserContext";
import { Button, Input, Select, Stack, useToast } from "@chakra-ui/react";
import { useState } from "react";

export default function AddressLine() {
  const user = useUser();
  const toast = useToast();
  const { onClose } = useModal();
  const [address, setAddress] = useState({
    city: "Улаанбаатар",
    district: "Хан-Уул",
    street: "",
    house: "",
    apartment: "",
    phone: "",
  });

  const handleChange = (e: any) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    user?.actions?.setAddress(JSON.stringify(address));
    console.log(user.actions);
    onClose();

    toast({
      title: "Амжилттай хадгаллаа",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    })
  };

  return (
    <Stack spacing={5}>
      <Input onChange={handleChange} name="city" placeholder="Хот / Аймаг" value={address.city} readOnly />
      <Select onChange={handleChange} name="district" value={address.district}>
        <option value="Баянзүрх">Баянзүрх</option>
        <option value="Баянгол">Баянгол</option>
        <option value="Хан-Уул">Хан-Уул</option>
        <option value="Сүхбаатар">Сүхбаатар</option>
        <option value="Сонгинохайрхан">Сонгинохайрхан</option>
        <option value="Чингэлтэй">Чингэлтэй</option>
      </Select>
      <Input onChange={handleChange} type="number" name="street" placeholder="Хороо / баг" value={address.street} />
      <Input onChange={handleChange} name="house" placeholder="Байр" value={address.house} />
      <Input onChange={handleChange} name="apartment" placeholder="Тоот" value={address.apartment} />
      <Input onChange={handleChange} type="number" name="phone" placeholder="Утас" value={address.phone} />
      <Button onClick={handleSave} colorScheme={"green"}>Хаяг оруулах</Button>
    </Stack>
  )

}