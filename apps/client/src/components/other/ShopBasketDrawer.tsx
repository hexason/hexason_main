import { useUser } from "@/src/context/UserContext";
import { Product } from "@/src/interface/product";
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerOverlay } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { BasketProductCard } from "./ProductCard";

export default function ShopBasketDrawer({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [products, setProducts] = useState<{info: Product, quantity: number}[]>([]);
  const {user, basket, actions} = useUser()
  const router = useRouter();
  
  const handleCheckout = () => {
    if(!user) {
      actions?.signInOpen();
      return;
    } 
    onClose();
    router.push("/order");
  }
  useEffect(() => {
    setProducts(basket);
    // if (data) setProducts(data.items);
  }, [basket]);


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
            products.map((item: any) => <BasketProductCard w={"100%"} key={item.id} data={item.info} quantity={item.quantity} />)
          }
        </DrawerBody>
        <DrawerFooter>
          <Button onClick={handleCheckout} w="100%" colorScheme='green'>Захиалга хийх {">>"}</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}