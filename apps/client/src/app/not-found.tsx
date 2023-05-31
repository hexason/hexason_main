"use client"
import { AuthLayout } from "@/components/layout"
import { Box, Link } from "@chakra-ui/react"

export default function NotFound() {
  return (
    <AuthLayout>
      <Box>
        Not Found
      </Box>
      <Link href={"/"}>Буцаад замаа олцгооё</Link>
    </AuthLayout>
  )
}