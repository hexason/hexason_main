import { OrderModal } from "@/components/core/Modal/OrderModal";
import { useDisclosure } from "@chakra-ui/react";
import { PropsWithChildren, createContext, useContext, useState } from "react";

const OrderContext = createContext<any>(null);

export function OrderProvider({ children }: PropsWithChildren) {
  const controller = useDisclosure();
  const [orderData, setOrderData] = useState({});

  const openModal = (data: any) => {
    setOrderData(data);
    controller.onOpen();
  };

  return (
    <OrderContext.Provider
      value={{
        openModal,
      }}
    >
      {children}
      <OrderModal data={orderData} {...controller} />
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrder must be used within a OrderProvider");
  return context;
}
