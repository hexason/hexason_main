"use client";
import { ProductList } from "@/components/build";
import HomeHeader from "@/components/build/Headers/HomeHeader";
import SearchHeader from "@/components/build/Headers/SearchHeader";
import { MobileCategory } from "@/components/core/MobileCategory";

export default function Home() {
  return (
    <>
      <SearchHeader />
      <HomeHeader />
      <MobileCategory />
      <ProductList />
    </>
  );
}
