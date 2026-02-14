import SignInFormSmall from "@/components/auth/SignInFormSmall";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js Small SignIn Page | TailAdmin - Next.js Dashboard Template",
  description: "A compact sign-in page where UI elements are intentionally small",
};

export default function SignInSmall() {
  return <SignInFormSmall />;
}
