"use client"
import { Box, Button, Stack } from "@chakra-ui/react"
import { useRouter } from "next/navigation"

export default function Page() {
  const router = useRouter()
  return (
    <Stack h="95vh" justifyContent={"center"} alignItems={"center"}>
      <Box>Тун удахгүй</Box>
      <Button onClick={() => router.back()}>Буцах</Button>
    </Stack>
  )
}