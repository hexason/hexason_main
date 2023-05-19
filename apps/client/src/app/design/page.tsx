"use client"
import { DefaultAnimate, ThreeDotsWave } from "@/components/animation";
import AuthForm from "@/components/core/Auth/AuthForm";
import { useAuth } from "@/context/AuthContext";

export default function Design() {
  const { supabase } = useAuth();

  return (
    <>
      <AuthForm supabaseClient={supabase} />
      <ThreeDotsWave />
      <DefaultAnimate>
        Test
      </DefaultAnimate>
    </>
  );
}