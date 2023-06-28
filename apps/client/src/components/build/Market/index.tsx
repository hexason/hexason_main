"use client";
import { useSearchParams } from "next/navigation";
import { Frame } from "../SearchFrame/Frame";
import { SearchBar } from "@/components/core";

export const MarketPlace = () => {
  const searchParams = useSearchParams();

  return (
    <>
      <SearchBar value={searchParams.get("s") || ""} />
      <Frame query={searchParams.get("s") || ""} provider={searchParams.get("provider") || "local"} limit={30} infinite={true} />
    </>
  );
};
