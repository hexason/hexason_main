import { useUser } from "@/src/context/UserContext";
import { Product } from "@/src/interface/product";
import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Button } from "@chakra-ui/react";
import { useState } from "react";

export default function ActionsProduct({ data }: {data: Product}){
  const { actions } = useUser();
  const [quantity, setQuantity] = useState(1);
  const handleQuantityChange = (value: number) => {
    if (value > data.quantity) setQuantity(quantity);
    setQuantity(value);
  };

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
        onClick={() => actions?.addToBasket(data, quantity)}
      >
        Захиалах
      </Button>
    </>
  )
}