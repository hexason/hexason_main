import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Logout() {
  const router = useRouter();
  const { removeUser } = useUser();

  useEffect(() => {
    removeUser();
    router.replace("login");
  }, [])

}