"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthLogo() {
  const pathname = usePathname();
  const isBugOrSmall =
    pathname.includes("bug") || pathname.includes("small");

  if (isBugOrSmall) {
    return (
      <div className="block mb-4 cursor-not-allowed opacity-70">
        <Image
          width={231}
          height={48}
          src="./images/logo/auth-logo.svg"
          alt="Logo"
        />
      </div>
    );
  }

  return (
    <Link href="/" className="block mb-4">
      <Image
        width={231}
        height={48}
        src="./images/logo/auth-logo.svg"
        alt="Logo"
      />
    </Link>
  );
}
