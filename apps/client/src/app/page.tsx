"use client"
import ChatBox from "@/components/build/ChatBox"
import HomeHeader from "@/components/build/Headers/HomeHeader"
import SearchHeader from "@/components/build/Headers/SearchHeader"
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