"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="flex h-[100dvh] flex-col items-center justify-center gap-8 bg-white">
      <div className="font-pacifico text-8xl font-bold">404</div>

      <div>Page Not Found~</div>

      <Button onClick={() => router.push("/")}>Back Home</Button>
    </div>
  );
};

export default NotFound;
