import { Button, Input, InputGroup, InputLeftAddon, Stack, Text, useToast } from "@chakra-ui/react";
import { FaInbox } from "react-icons/fa";
import { supabase } from "@/src/lib/Store";
import { useState } from "react";
import { useModal } from "@/src/context/ModalContext";
import { IoLogIn } from "react-icons/io5";

export default function EmailPasswordModal() {
  const [email, setEmail] = useState("");
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const { onClose } = useModal();

  const signInWithMagicLink = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
    });
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Амжилттай",
        description: "Нэвтрэх линк таны цахим хаягруу явуулсан. Та цахим хаягаа шалгана уу.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    }
    setLoading(false);
  }

  const handleChange = (e: any) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
  }

  return (
    <Stack spacing={5}>
      <InputGroup>
        <InputLeftAddon>
          <FaInbox />
        </InputLeftAddon>
        <Input onChange={handleChange} value={email} name="email" type="text" placeholder="Цахим хаяг: mail@mail.com" />
      </InputGroup>
      <Button isLoading={loading} onClick={signInWithMagicLink}
        bg="primary.500"
        _hover={{ bg: "primary.600" }}
        color="white"
        variant="solid">
        <IoLogIn /><Text ml="2">Нэвтрэх линк авах</Text>
      </Button>
    </Stack>
  )
}