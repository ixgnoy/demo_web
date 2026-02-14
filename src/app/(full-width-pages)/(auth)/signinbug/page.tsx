import SignInFormBug from "@/components/auth/SignInFormBug";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js SignIn Bug Page | TailAdmin - Next.js Dashboard Template",
  description: "SignIn page variant where buttons are disabled (bug)",
};

export default function SignInBugNoHyphen() {
  return <SignInFormBug />;
}
