import { Grid, GridItem, Flex, List, ListItem, ListIcon, Divider, Box, Button, useDisclosure, Center, HStack, Input, Text, InputGroup, InputLeftAddon, InputRightAddon, Stack, useClipboard } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsCardChecklist, BsFillArrowDownSquareFill, BsFillArrowUpSquareFill } from "react-icons/bs";
import { FaWallet } from "react-icons/fa";
import { IoAccessibility } from "react-icons/io5";
import { useUser } from "../context/UserContext";
import { useCurrencyFormat } from "../utils/CurrencyFormat";
import DefaulModal from "./Modals/DefaultModal";
import Balance from "./User/Balance";
import Products from "./User/Products";
import Projects from "./User/Projects";
import Status from "./User/Status";

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
    setModal(<DepositContent {...{onCopy, value, hasCopied, wallet}}  />)
  }

  const handleWithdraw = () => {
    onOpen();
    if (refreshSession) refreshSession();
    setModal(<WithdrawContent />)
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
  return (
    <Box>
      <Balance />
      <Divider my={4} />
      <Status />
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

const DepositContent = ({onCopy, value, hasCopied, wallet}:any) => {
  const formatter = useCurrencyFormat();
  return (
    <Center>
      <Stack spacing={"3px"}>
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
      </Stack>
    </Center>
  )
}

const WithdrawContent = () => {
  return (
    <Center>
      <Text>Withdraw will open Feb 15, Minimum will be 5$</Text>
    </Center>
  )
}