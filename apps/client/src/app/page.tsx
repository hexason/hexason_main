"use client"
import { ProductList } from "@/components/build"
import HomeHeader from "@/components/build/Headers/HomeHeader"
import SearchHeader from "@/components/build/Headers/SearchHeader"
import DefaultLayout from "@/components/layout/DefaultLayout"

export default function Home() {
  return (
    <DefaultLayout spacing={6}>
      <SearchHeader />
      <HomeHeader />
      <ProductList />
    </DefaultLayout>
  )
}