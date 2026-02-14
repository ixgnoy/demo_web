import SignUpFormBug from "@/components/auth/SignUpFormBug";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js SignUp Bug Page | TailAdmin - Next.js Dashboard Template",
  description: "SignUp page variant where buttons are disabled (bug)",
};

export default function SignUpBugNoHyphen() {
  return <SignUpFormBug />;
}
