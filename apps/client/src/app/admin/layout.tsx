"use client"
import { LayoutBuilder } from "@/components/layout";
import { Providers } from "../provider";

export default function AdminLayout({ children }: any) {
  return (
    <Providers>
      <LayoutBuilder>
        {children}
      </LayoutBuilder>
    </Providers>
  )
}