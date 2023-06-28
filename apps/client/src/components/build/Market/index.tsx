"use client";
import { useSearchParams } from "next/navigation";
import { Frame } from "../SearchFrame/Frame";

export const MarketPlace = () => {
  const searchParams = useSearchParams();

  return (
    <Frame query={searchParams.get("s") || ""} provider={searchParams.get("provider") || "local"} limit={30} infinite={true} />
  );
};
