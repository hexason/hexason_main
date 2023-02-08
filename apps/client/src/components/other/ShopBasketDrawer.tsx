import { Product } from "@/src/interface/product";
import { useAxios } from "@/src/utils/axiosHook";
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerOverlay, Input } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { BasketProductCard } from "./ProductCard";

export default function ShopBasketDrawer({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [products, setProducts] = useState<Product[]>([]);
  const { data, loaded } = useAxios<{ count: 0, items: Product[] }>("/product", {}, "get");
  useEffect(() => {
    if (data) setProducts(data.items);
  }, [data]);


  return (
    <Drawer
      placement="right"
      onClose={onClose}
      isOpen={isOpen}
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerBody>
          {
            loaded ? products.map((item: any) => <BasketProductCard w={"100%"} key={item.id} data={item} />) : null
          }
        </DrawerBody>
        <DrawerFooter>
          <Button w="100%" colorScheme='green'>Захиалга хийх {">>"}</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}