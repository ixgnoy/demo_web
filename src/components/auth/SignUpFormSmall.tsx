"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/auth";

export default function SignUpFormSmall() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="w-full max-w-sm sm:pt-6 mx-auto mb-3">
        <Link
          href="/"
          className="inline-flex items-center text-xs text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon />
          <span className="ml-1">Back</span>
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-sm mx-auto">
        <div>
          <div className="mb-3 sm:mb-4">
            <h1 className="mb-1 font-semibold text-gray-800 text-sm dark:text-white/90">Sign Up (Small)</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Compact sign-up view</p>
          </div>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setMessage(null);
              if (!isChecked) {
                setMessage("Please accept Terms and Conditions");
                return;
              }
              if (!email || !password || !fname) {
                setMessage("Please fill required fields");
                return;
              }
              const res = await registerUser({ fname, lname, email, password });
              if (!res.success) {
                setMessage(res.message || "Failed to register");
                return;
              }
              router.push("/signinsmall");
            }}
          >
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label>
                    <span className="text-xs">First</span>
                  </Label>
                  <Input type="text" placeholder="First" value={fname} onChange={(e:any)=>setFname(e.target.value)} />
                </div>
                <div>
                  <Label>
                    <span className="text-xs">Last</span>
                  </Label>
                  <Input type="text" placeholder="Last" value={lname} onChange={(e:any)=>setLname(e.target.value)} />
                </div>
              </div>
              <div>
                <Label><span className="text-xs">Email</span></Label>
                <Input type="email" placeholder="you@mail.com" value={email} onChange={(e:any)=>setEmail(e.target.value)} />
              </div>
              <div>
                <Label><span className="text-xs">Password</span></Label>
                <div className="relative">
                  <Input type={showPassword ? "text" : "password"} placeholder="password" value={password} onChange={(e:any)=>setPassword(e.target.value)} />
                  <span onClick={()=>setShowPassword(!showPassword)} className="absolute z-30 -translate-y-1/2 cursor-pointer right-3 top-1/2">
                    {showPassword ? <EyeIcon className="fill-gray-500 dark:fill-gray-400" /> : <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Checkbox checked={isChecked} onChange={setIsChecked} />
                <span className="text-xs text-gray-500">Agree to Terms</span>
              </div>
              {message && <div className="text-xs text-center text-red-600">{message}</div>}
              <div>
                <button
                  type="submit"
                  className="w-6 h-6 px-0 py-0 text-[9px] font-medium text-white rounded-sm bg-brand-500 hover:bg-brand-600"
                  aria-label="Sign up"
                >
                  Up
                </button>
              </div>
              <div className="text-xs text-center text-gray-700 dark:text-gray-400">
                Already have an account? <Link href="/signinsmall" className="text-brand-500">Sign In</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
