"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";

import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/auth";

export default function SignInFormSmall() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();

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
            <h1 className="mb-1 font-semibold text-gray-800 text-sm dark:text-white/90">
              Sign In (Small)
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Compact sign-in view
            </p>
          </div>
          <div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
              <button className="inline-flex items-center justify-center gap-2 py-2 text-xs font-normal text-gray-700 bg-gray-100 rounded-sm px-3 dark:bg-white/5 dark:text-white/90 cursor-not-allowed opacity-90" disabled>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.7511 10.1944C18.7511 9.47495 18.6915 8.94995 18.5626 8.40552H10.1797V11.6527H15.1003C15.0011 12.4597 14.4654 13.675 13.2749 14.4916L13.2582 14.6003L15.9087 16.6126L16.0924 16.6305C17.7788 15.1041 18.7511 12.8583 18.7511 10.1944Z" fill="#4285F4"/>
                </svg>
                <span>Google</span>
              </button>
              <button className="inline-flex items-center justify-center gap-2 py-2 text-xs font-normal text-gray-700 bg-gray-100 rounded-sm px-3 dark:bg-white/5 dark:text-white/90 cursor-not-allowed opacity-90" disabled>
                <svg width="16" height="16" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.6705 1.875H18.4272L12.4047 8.75833L19.4897 18.125H13.9422L9.59717 12.4442L4.62554 18.125H1.86721L8.30887 10.7625L1.51221 1.875H7.20054L11.128 7.0675L15.6705 1.875ZM14.703 16.475H16.2305L6.37054 3.43833H4.73137L14.703 16.475Z"/></svg>
                <span>X</span>
              </button>
            </div>
            <div className="relative py-2 sm:py-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="p-1 text-gray-400 bg-white dark:bg-gray-900 sm:px-3 sm:py-1">Or</span>
              </div>
            </div>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setMessage(null);
                if (!email || !password) {
                  setMessage("Please enter email and password");
                  return;
                }
                const res = await loginUser({ email, password });
                if (!res.success) {
                  setMessage(res.message || "Sign in failed");
                  return;
                }
                router.push("/");
              }}
            >
              <div className="space-y-3">
                <div>
                  <Label>
                    <span className="text-xs">Email</span>
                  </Label>
                  <Input placeholder="you@mail.com" type="email" value={email} onChange={(e:any)=>setEmail(e.target.value)} />
                </div>
                <div>
                  <Label>
                    <span className="text-xs">Password</span>
                  </Label>
                  <div className="relative">
                    <Input type={showPassword ? "text" : "password"} placeholder="password" value={password} onChange={(e:any)=>setPassword(e.target.value)} />
                    <span onClick={() => setShowPassword(!showPassword)} className="absolute z-30 -translate-y-1/2 cursor-pointer right-3 top-1/2">
                      {showPassword ? <EyeIcon className="fill-gray-500 dark:fill-gray-400" /> : <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 dark:text-gray-400">Keep me logged in</span>
                  </div>
                  <Link href="/reset-password" className="text-xs text-brand-500">Forgot?</Link>
                </div>
                {message && <div className="text-xs text-center text-red-600">{message}</div>}
                <div>
                  <button
                    type="submit"
                    className="w-6 h-6 px-0 py-0 text-[9px] font-medium text-white rounded-sm bg-brand-500 hover:bg-brand-600"
                    aria-label="Sign in"
                  >
                    Sign
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-3">
              <p className="text-xs text-center text-gray-700 dark:text-gray-400">
                Don&apos;t have an account? <Link href="/signupsmall" className="text-xs text-brand-500">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
