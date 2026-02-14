import SignUpFormSmall from "@/components/auth/SignUpFormSmall";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js Small SignUp Page | TailAdmin - Next.js Dashboard Template",
  description: "A compact sign-up page where UI elements are intentionally small",
};

export default function SignUpSmall() {
  return <SignUpFormSmall />;
}
