import { useModal } from "@/src/context/ModalContext";
import { useUser } from "@/src/context/UserContext";
import { Product } from "@/src/interface/product";
import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import AddressLine from "./AddressLine";

export default function ActionsProduct({ data }: { data: Product }) {
  const { actions, address, accessToken } = useUser();
  const [quantity, setQuantity] = useState(1);
  const { onOpen, setChild } = useModal();
  const handleQuantityChange = (value: number) => {
    if (value > data.quantity) setQuantity(quantity);
    setQuantity(value);
  };
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const addresSave = () => {
    setChild(<AddressLine nextStep={createOrder} />);
    onOpen();
  }
  const createOrder = async (updatedAddress?:any) => {
    setLoading(true);
    await axios({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      url: "/user/order/create",
      method: "post",
      headers: {
        Authorization: "Bearer " + accessToken
      },
      data: {
        address: updatedAddress || (address ? JSON.parse(address) : undefined),
        products: [{ id: data.id, quantity }]
      }
    }).then(() => {
      toast({
        title: "Захиалга амжилттай бүртгэгдлээ.",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      router.push("/user")
    }).catch(() => {
      toast({
        title: "Захиалга бүртгэхэд алдаа гарлаа.",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }).finally(() => setLoading(false));
  }

  return (
    <>
      <NumberInput
        value={quantity}
        max={data.quantity}
        min={1}
        onChange={(value) => handleQuantityChange(+value)}
        // keepWithinRange={false}
        clampValueOnBlur={false}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Button
        onClick={() => actions?.addToBasket(data, quantity)}
        colorScheme={"green"}>
        Сагслах
      </Button>
      <Button
        colorScheme={"primary"}
        isLoading={loading}
        onClick={address ? createOrder : addresSave}
      >
        Захиалах
      </Button>
    </>
  )
}