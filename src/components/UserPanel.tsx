import { Grid, GridItem, Flex, List, ListItem, ListIcon, Divider, Box, Button, useDisclosure, Center, HStack, Input, Text, InputGroup, InputLeftAddon, InputRightAddon, Stack, useClipboard, Link, Icon, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsCardChecklist, BsFillArrowDownSquareFill, BsFillArrowUpSquareFill } from "react-icons/bs";
import { FaWallet } from "react-icons/fa";
import { IoAccessibility, IoLogoUsd } from "react-icons/io5";
import { useUser } from "../context/UserContext";
import { useCurrencyFormat } from "../utils/CurrencyFormat";
import DefaulModal from "./Modals/DefaultModal";
import Balance from "./User/Balance";
import Products from "./User/Products";
import Projects from "./User/Projects";
import Status from "./User/Status";
import QRCode from "qrcode"

export default function UserPanel() {
  const [page, setPage] = useState("status");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { onCopy, value, setValue, hasCopied } = useClipboard("");
  const { wallet, refreshSession } = useUser();
  const [modal, setModal] = useState<any>(null);


  const handleSwitcher = (page: string) => {
    setPage(page);
  }

  const handleDeposit = () => {
    onOpen();
    if (refreshSession) refreshSession();
    setModal(<DepositContent {...{ onCopy, value, hasCopied, wallet }} />)
  }

  const handleWithdraw = () => {
    onOpen();
    if (refreshSession) refreshSession();
    setModal(<WithdrawContent {...{ wallet, onClose }} />)
  }

  useEffect(() => {
    setValue(wallet.address);
  }, [wallet])

  return (
    <Grid w="100%" templateColumns={"repeat(6,1fr)"}>
      <GridItem colSpan={[6, 2]}>
        <Flex padding={6} flexDirection={"column"}>
          <List fontSize={"18px"} spacing={2}>
            <ListButton trigger={() => { handleSwitcher("status") }} active={(page === "status" ? true : false)}>
              <ListIcon as={IoAccessibility} />
              Profile
            </ListButton>
            <ListButton trigger={() => { handleSwitcher("product") }} active={(page === "product" ? true : false)}>
              <ListIcon as={BsCardChecklist} />
              My Cards
            </ListButton>
            <Divider my="2" />
            <Button colorScheme={"blackAlpha"} as={Flex} justifyContent="start" color="green.400" w="100%" onClick={handleDeposit}>
              <ListIcon as={BsFillArrowUpSquareFill} />
              Deposit
            </Button>
            <Button colorScheme={"blackAlpha"} as={Flex} justifyContent="start" color={"blue.400"} w="100%" onClick={handleWithdraw}>
              <ListIcon as={BsFillArrowDownSquareFill} />
              Withdraw
            </Button>
          </List>
          <DefaulModal isOpen={isOpen} onClose={onClose} title="">
            {modal}
          </DefaulModal>
        </Flex>
      </GridItem>
      <GridItem p={6} colSpan={[6, 4]}>
        <PageViewer page={page} />
      </GridItem>
    </Grid>
  )
}

const PageViewer = ({ page }: { page: string }) => {
  switch (page) {
    case "product":
      return <ProductPage />
    case "status":
      return <StatusPage />
    default:
      return <ProductPage />
  }
}

const ProductPage = () => {
  return (
    <Box>
      <Products />
    </Box>
  )
}

const StatusPage = () => {
  const { earnedDays } = useUser();
  return (
    <Box>
      <Balance />
      <Divider my={4} />
      <Status date={earnedDays} />
      <Divider my={4} />
      <Projects />
    </Box>
  )
}

const ListButton = ({ children, active, trigger, ...props }: any) => {
  return (
    <ListItem
      cursor={"pointer"}
      onClick={trigger}
      border="1px solid teal" background={active ? "teal" : ""} borderRadius={"20px"} p={3} color={active ? "white" : "teal"} {...props}>
      {children}
    </ListItem>
  )
}

const DepositContent = ({ onCopy, value, hasCopied, wallet }: any) => {
  const formatter = useCurrencyFormat();
  useEffect(() => {
    var canvas = document.getElementById('qrcode')

    QRCode.toCanvas(canvas, value, function (error) {
      if (error) console.error(error)
      console.log('success!');
    })
  }, [value])
  return (
    <Center>
      <Stack spacing={"3"}>
        <Center>
          <HStack>
            <Text color="white" fontSize={"18px"}>Your balance: </Text>
            <Text fontWeight={"bold"} color={"green.600"}>{formatter(wallet.balance)}</Text>
          </HStack>
        </Center>
        <InputGroup>
          <InputLeftAddon>
            <FaWallet size={"20px"} />
          </InputLeftAddon>
          <Input readOnly value={value} />
          <InputRightAddon onClick={onCopy} as={Button} bg={"green.600"}>
            {hasCopied ? "Done" : "Copy"}
          </InputRightAddon>
        </InputGroup>
        <Center>
          <canvas id="qrcode" />
        </Center>
        <Box p="3">
          <Text color="gray.400" textAlign={"center"}>
            {'We apologize for any inconvenience, currently, we only accept TRC20 USDT for withdrawals. We suggest using'} <Link target={"_blank"} color={"orange"} href="https://binance.com">Binance</Link> {'to charge your wallet. We understand the need for more withdrawal options and assure you that we are working on adding more methods as quickly as possible. Thank you for your patience.'}
          </Text>
          <Text color="red.400" textAlign={"center"}>
            {'Minimum deposit amount is 10 USDT. Your deposit will be processed within 3-15 minute.'}
          </Text>
        </Box>
      </Stack>
    </Center>
  )
}

const WithdrawContent = ({ wallet, onClose }: any) => {
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [recive, setRecive] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { withdrawal } = useUser();
  const formatter = useCurrencyFormat();

  const handleWithdraw = () => {
    setLoading(true);
    if (withdrawal) withdrawal(address, +amount).then(({ data }) => {
      toast({
        position: "top",
        title: "Withdrawal request sent",
        description: `You will receive ${recive} USDT to ${address}`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      onClose();
    }).catch((err) => {
      console.log(err)
      toast({
        position: "top",
        title: "Withdrawal request failed",
        description: err.response ? err.response.data.message : err.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }).finally(() => {
      setLoading(false);
    }); else setLoading(false);
  }
  const inputHandler = (e: any) => {
    const { name, value } = e.target;
    if (name === "amount") {
      setAmount((+value).toString());
      setRecive(formatter((+value - 2 < 0 ? 0 : +value)));
    }
    if (name === "address") setAddress(value);
  }
  return (
    <Center>
      <Stack spacing={"3"}>
        <Center>
          <HStack>
            <Text color="white" fontSize={"18px"}>Your balance: </Text>
            <Text fontWeight={"bold"} color={"green.600"}>{formatter(wallet.balance)}</Text>
          </HStack>
        </Center>
        <InputGroup>
          <InputLeftAddon>
            <FaWallet size={"20px"} />
          </InputLeftAddon>
          <Input onChange={inputHandler} name="address" value={address} placeholder="TXMXXXXXXXXXXXXXXXskdX" />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon>
            <IoLogoUsd size={"20px"} />
          </InputLeftAddon>
          <Input onChange={inputHandler} name="amount" value={amount} type="number" placeholder="10USDT" />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon>
            <BsFillArrowDownSquareFill size={"20px"} />
          </InputLeftAddon>
          <Input readOnly value={recive} placeholder="10USDT" />
        </InputGroup>
        <Button isLoading={loading} onClick={handleWithdraw} colorScheme={"teal"} as={Flex} w="100%">
          <Icon as={BsFillArrowDownSquareFill} mr="5px" />
          Withdraw
        </Button>
        <Box p="3">
          <Text color="gray.400" textAlign={"center"}>
            {'We are support TRC20 Network. Please make sure you have enough TRC20 USDT in your wallet.'}
          </Text>
          <Text color="red.400" textAlign={"center"}>
            {'Minimum withdrawal amount is 10 USDT.'} <br /> {'Withdrawal fee is 2 USDT.'}
          </Text>
        </Box>
      </Stack>
    </Center>
  )
}