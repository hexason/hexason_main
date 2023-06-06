import { InputGroup, InputLeftAddon, Button, Input, InputRightAddon } from "@chakra-ui/react";
import { useState } from "react";

export const QuantityController = (props: any) => {
  const [quant, setQuant] = useState(0);
  const handleInputChanger = (e: any) => {
    let value = e.target.value;
    if (value.length > 0) {
      value = value.replace(/[^0-9]/g, '');
      setQuant(parseInt(value) > 0 ? parseInt(value) : 1);
      return;
    } else {
      setQuant(1);
    }
  }
  const addRemoveHandler = (indicator: number) => {
    setQuant(prev => (prev + indicator > 0 ? prev + indicator : 1));
  }
  return (
    <InputGroup {...props}>
      <InputLeftAddon bg="hexmain.500" onClick={() => addRemoveHandler(-1)} as={Button}>-</InputLeftAddon>
      <Input onChange={handleInputChanger} value={quant} w="50px" _focus={{ w: "100px" }} />
      <InputRightAddon bg="hexmain.500" onClick={() => addRemoveHandler(1)} as={Button}>+</InputRightAddon>
    </InputGroup>
  )
}