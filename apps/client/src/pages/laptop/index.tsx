import ProductCard from "@/src/components/other/ProductCard";
import { Button, Heading, Input, Stack, useToken, Text, Box } from "@chakra-ui/react";
import { useState } from "react";

export default function Laptop() {
  const [primary] = useToken(
    'colors',
    ['primary.400'],
  );
  const [price, setPrice] = useState("");
  const [hide, setHide] = useState(true);

  const handlePriceChange = (e: any) => {
    const formattedPrice = e.target.value.replace(/[^0-9]/g, '').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    setPrice(formattedPrice);
  };
  const handleSubmit = () => {
    setHide(true);
    setTimeout(() => {
      setHide(false);
    }, 700);
  };

  return (
    <Stack justifyContent={"center"} alignItems="center" minH="500px" p={10} spacing={5}>
      <Heading textAlign={"center"}>{'Хэдэн төгрөгт компьютер хайж байна вэ?'}</Heading>
      <Input
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit();
          }
        }}
        onChange={handlePriceChange}
        value={price}
        border={`1px solid ${primary}`}
        borderRadius={"0.25rem"}
        placeholder="3,000,000₮"
      />
      {price ? <Button onClick={handleSubmit} className="fade-in" colorScheme={"primary"}>Надад гайхамшиг үзүүлээч 🤩</Button> : <Text>{'☝️ эхлээд үнэ оруулаарай. Доод тал нь 500,000₮ байх хэрэгтэй шүү!'}</Text>}

      {!hide ? <Box>
        <ProductCard data={{
          id: "1",
          title: 'Macbook Pro 13"',
          price: 3000000,
          image: 'https://i.ytimg.com/vi/V7pce4nrR4c/maxresdefault.jpg',
          description: 'Apple M1 chip with 8‑core CPU, 8‑core GPU, and 16‑core Neural Engine',
          brand: 'Apple',
          sold: 0,
          quantity: 10,
          status: 'active',
          images: [],
          airedAt: "2021-01-01T00:00:00.000Z",
          createdAt: "2021-01-01T00:00:00.000Z",
          updatedAt: "2021-01-01T00:00:00.000Z"
        }}
        feature={"stake"}
        />
      </Box>
        : null}
    </Stack>
  );
}