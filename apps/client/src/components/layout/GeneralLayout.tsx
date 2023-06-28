"use client";
import { Container, Stack } from "@chakra-ui/react";
import { SearchBar, TopUpBar } from "../core";
import { usePathname } from "next/navigation";

export const GeneralLayout = ({ children, ...props }: any) => {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return <>{children}</>;
  return (
    <>
      <TopUpBar />
      {/* {pathname === "/" ? <TopAdBar /> : null} */}
      <Stack display={{ base: 'flex', md: "none" }}>
        <SearchBar />
      </Stack>
      <Container as={Stack} maxW="container.xl" {...props}>
        {children}
      </Container>
    </>
  );
};
