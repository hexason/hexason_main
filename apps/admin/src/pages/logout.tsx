import { supabase } from "@/lib/Supabase";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Logout() {
  const router = useRouter();
  useEffect(() => {
    supabase.auth.signOut();
    router.replace("/");
  }, []);

  return <>Loading...</>
}