"use client"
import ChatBox from "@/components/core/ChatBox"
import DefaultLayout from "@/components/layout/DefaultLayout"
import { FileUploader, FileUploaderMany } from "@sales24/client";

export default function Home() {
  return (
    <DefaultLayout>
      <ChatBox />
      <FileUploader />
      <FileUploaderMany />
    </DefaultLayout>
  )
}