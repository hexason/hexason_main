import { Grid, GridItem, Flex, List, ListItem, ListIcon, Divider, Box } from "@chakra-ui/react";
import { useState } from "react";
import { BsCardChecklist } from "react-icons/bs";
import { IoAccessibility } from "react-icons/io5";
import Balance from "./User/Balance";
import Products from "./User/Products";
import Projects from "./User/Projects";
import Status from "./User/Status";

export default function UserPanel() {
  const [page, setPage] = useState("status");


  const handleSwitcher = (page: string) => {
    setPage(page);
  }

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
          </List>
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