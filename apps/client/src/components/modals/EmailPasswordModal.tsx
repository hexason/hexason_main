import { Button, Input, InputGroup, InputLeftAddon, Stack, useToast } from "@chakra-ui/react";
import { FaInbox, FaKey } from "react-icons/fa";
import { supabase } from "@/src/lib/Store";
import { useState } from "react";
import { useModal } from "@/src/context/ModalContext";

export default function EmailPasswordModal({refreshSession}:any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_again, setPasswordAgain] = useState("");
  const [pwdHide, setPwdHide] = useState(true);
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const {onClose} = useModal();
  const signIn = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
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
      refreshSession();
      onClose();
    }
    setLoading(false);
  };

  const signUp = async () => {
    if (password !== password_again) {
      toast({
        title: "Error",
        description: "Нууц үг хоорондоо таарахгүй байна",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
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
        description: "Та цахим хаягаа шалгаарай",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
    setLoading(false);
  }

  const handleChange = (e: any) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "password_again") {
      setPasswordAgain(e.target.value);
    }
  }

  return (
    <Stack spacing={5}>
      <InputGroup>
        <InputLeftAddon>
          <FaInbox />
        </InputLeftAddon>
        <Input onChange={handleChange} value={email} name="email" type="text" placeholder="Хэрэглэгчийн нэр" />
      </InputGroup>
      <InputGroup>
        <InputLeftAddon>
          <FaKey />
        </InputLeftAddon>
        <Input onChange={handleChange} value={password} name="password" type="password" placeholder="Нууц үг" />
      </InputGroup>
      {!pwdHide ?
        <InputGroup>
          <InputLeftAddon>
            <FaKey />
          </InputLeftAddon>
          <Input onChange={handleChange} value={password_again} name="password_again" type="password" placeholder="Нууц үг дахин" />
        </InputGroup>
        : null}
      <Button isLoading={loading} onClick={signIn} colorScheme="primary" variant="solid">
        Нэвтрэх
      </Button>
      <Button isLoading={loading} onClick={() => {
        if (pwdHide) {
          setPwdHide(false);
        } else {
          signUp();
        }
      }} colorScheme="primary" variant="solid">
        Бүртгүүлэх
      </Button>
    </Stack>
  )
}