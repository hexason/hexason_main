"use client";
import { useSession } from "@/lib/supabase-react";
import { AuthLayout } from "./AuthLayout";
import DashboardLayout from "./DashboarLayout";
import { AuthForm } from "../core";

export const LayoutBuilder = ({ children }: any) => {
  const session = useSession();

  if (session) return <DashboardLayout>{children}</DashboardLayout>;
  return (
    <AuthLayout>
      <AuthForm />
    </AuthLayout>
  );
};
