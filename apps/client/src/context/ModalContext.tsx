import { UseDisclosureProps, useDisclosure } from "@chakra-ui/react";
import { createContext, useContext } from "react";

const ModalContext = createContext<UseDisclosureProps>({});
export default function ModalContextProvider({ children }: any) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <ModalContext.Provider value={{
      isOpen,
      onClose,
      onOpen,
    }}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => useContext(ModalContext);