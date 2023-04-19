import AuthForm from "@/components/core/Auth/AuthForm";
import AuthLayout from "@/components/core/Auth/AuthLayout";
import ChatBox from "@/components/core/ChatBox";
import { useAuth } from "@/context/AuthContext";

export default function Support() {
  const { session, supabase } = useAuth();
  if (!session)
    return (
      <AuthLayout>
        <AuthForm supabaseClient={supabase} />
      </AuthLayout>
    )

  return (
    <>
      <ChatBox />
    </>
  )
}