import { useAddress } from "@/context/AddressContext";
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Stack,
  Switch,
} from "@chakra-ui/react";
import { AddressList } from "../Address/AddressList";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { createOrderGQL } from "@/lib/Services";
import { useEffect, useState } from "react";
import { AddressFormEdit } from "../Address/AddressFormEdit";

export function OrderModal({
  isOpen,
  onClose,
  data,
  ...props
}: Omit<ModalProps, "children"> & {
  data: any
}) {
  const router = useRouter();
  const { address } = useAddress();
  const [createOrder, { loading: loadingOrder }] = useMutation(createOrderGQL);
  const [state, setState] = useState<"create" | "select">("select")
  const switcher = () => {
    setState(prev => prev === "select" ? 'create' : "select")
  }

  useEffect(() => {
    setState("select")
  }, [address])

  const acceptHandle = async () => {
    if (!address) return;
    await createOrder({
      variables: {
        data: {
          additional_info: "",
          address_city: address.address_city,
          address_district: address.address_district,
          address_street: address.address_street,
          address_info: address.address_info,
          contact_email: address.contact_email,
          contact_phone: address.contact_phone,
          description: "",
          username: address.username,
          items: data,
        },
      },
    });
    onClose();
    router.push("/order");
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose} {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Захиалга үүсгэх</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack>
            {
              state === "select" ? (
                <>
                  <AddressList />
                  <Button colorScheme="blue" onClick={switcher}>Хаяг үүсгэх</Button>
                  <Button onClick={acceptHandle} isDisabled={!address} isLoading={loadingOrder} variant="solid">Захиалга үүсгэх</Button>
                </>
              ) : (
                <>
                  <Button onClick={() => setState("select")}>Буцах</Button>
                  <AddressFormEdit />
                </>
              )
            }
          </Stack>
          {JSON.stringify(data || {})}
        </ModalBody>

      </ModalContent>
    </Modal>
  );
}
