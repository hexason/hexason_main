"use client"
import ChatBox from "@/components/build/ChatBox"
import HomeHeader from "@/components/core/Headers/HomeHeader"
import SearchHeader from "@/components/core/Headers/SearchHeader"
import DefaultLayout from "@/components/layout/DefaultLayout"

export default function Home() {
  return (
    <DefaultLayout>
      <SearchHeader />
      <HomeHeader />
      <ChatBox />
    </DefaultLayout>
  )
}