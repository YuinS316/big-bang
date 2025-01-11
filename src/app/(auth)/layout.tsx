"use client";

import Link from "next/link";
import * as React from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="paper-bg relative min-h-screen">
      <div className="backdrop-bg absolute left-0 top-0 z-10 w-full px-10 py-3 shadow-sm">
        <Link href="/" className="font-pacifico text-2xl">
          BigBang
        </Link>
      </div>
      {/* 内容区域 */}
      <div className="flex min-h-screen items-center justify-center">
        {children}
      </div>
    </div>
  );
}
