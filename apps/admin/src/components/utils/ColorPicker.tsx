import { Popover, PopoverTrigger, Button, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, Center, PopoverBody, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function ColorPicker({ value, onChange }: { value?: string, onChange?: any }) {
  const [color, setColor] = useState("#718096");
  const colors = ["#718096", "#E53E3E", "#2D3748", "#38A169", "#4299E1", "#1A365D", "#ECC94B", "#ED8936", "#9F7AEA", "#ED64A6"];
  useEffect(() => {
    if (value) setColor(value);
  }, [value])

  return (
    <Popover variant="picker">
      <PopoverTrigger>
        <Button
          aria-label={color}
          background={color}
          height="22px"
          width="22px"
          padding={0}
          minWidth="unset"
          border="1px solid #fff"
          borderRadius={3}
        ></Button>
      </PopoverTrigger>
      <PopoverContent width="170px">
        <PopoverArrow bg={color} />
        <PopoverCloseButton color="white" />
        <PopoverHeader
          height="100px"
          backgroundColor={color}
          borderTopLeftRadius={5}
          borderTopRightRadius={5}
          color="white"
        >
          <Center height="100%">{color}</Center>
        </PopoverHeader>
        <PopoverBody height="120px">
          <SimpleGrid columns={5} spacing={2}>
            {colors.map((c) => (
              <Button
                key={c}
                aria-label={c}
                background={c}
                height="22px"
                width="22px"
                padding={0}
                minWidth="unset"
                borderRadius={3}
                _hover={{ background: c }}
                onClick={() => {
                  onChange && onChange(c);
                  setColor(c);
                }}
              ></Button>
            ))}
          </SimpleGrid>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}