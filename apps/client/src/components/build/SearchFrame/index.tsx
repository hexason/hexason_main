"use client";
import { Badge, Divider, HStack, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import { Frame } from "./Frame";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const dummy = [
  {
    provider: "taobao",
    providerIcon:
      "https://gw.alicdn.com/imgextra/i1/O1CN01LfyvED1TpRW5ppmks_!!6000000002431-2-tps-214-134.png",
  },
  {
    provider: "imex",
    providerIcon: "https://i.ibb.co/W6bGZff/imelogo.png",
  },
];

export const SearchFrame = () => {
  const searchParams = useSearchParams();
  return (
    <Stack>
      {dummy.map((supplier) => (
        <Stack key={supplier.provider}>
          <HStack>
            <Image
              alt={supplier.provider}
              unoptimized
              width={100}
              height={25}
              src={supplier.providerIcon}
            />
            <Divider h="1px" bg="black" />
            <Badge as={Link} href={`/shop?provider=${supplier.provider}&s=${searchParams.get("s") || ""}`} w="100px">
              See more
            </Badge>
          </HStack>
          <Frame
            provider={supplier.provider}
            limit={5}
            query={searchParams.get("s") || ""}
          />
        </Stack>
      ))}
    </Stack>
  );
};
