"use client";
import { LayoutBuilder } from "@/components/layout";
import { ReactNode } from "react";

export default function AdminProvider({ children }: { children: ReactNode }) {
  return <LayoutBuilder>{children}</LayoutBuilder>;
}
