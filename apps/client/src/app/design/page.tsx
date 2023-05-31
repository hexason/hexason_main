"use client"
import { DefaultAnimate, ThreeDotsWave } from "@/components/animation";
import { AuthForm } from "@/components/core";

export default function Design() {
  return (
    <>
      <AuthForm />
      <ThreeDotsWave />
      <DefaultAnimate>
        Test
      </DefaultAnimate>
    </>
  );
}