"use client"
import ChatBox from "@/components/core/ChatBox"
import DefaultLayout from "@/components/layout/DefaultLayout"
import { Box, Heading } from "@chakra-ui/react";
import { FileUploader, FileUploaderMany } from "@sales24/client";

export default function Home() {
  return (
    <DefaultLayout>
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