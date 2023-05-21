"use client"
import ChatBox from "@/components/build/ChatBox"
import HomeHeader from "@/components/build/Headers/HomeHeader"
import SearchHeader from "@/components/build/Headers/SearchHeader"
import DefaultLayout from "@/components/layout/DefaultLayout"
import { Box, Heading } from "@chakra-ui/react";
import { FileUploader, FileUploaderMany } from "@sales24/client";

export default function Home() {
  return (
    <DefaultLayout>
      <SearchHeader />
      <HomeHeader />
      <ChatBox />
      <Heading>One File Upload</Heading>
      <Box color="white" h="400px" w="200px">
        <FileUploader />
      </Box>

      <Heading>Simple Upload Manager</Heading>
      <Box h="400px" w="100%">
        <FileUploaderMany />
      </Box>
    </DefaultLayout>
  )
}