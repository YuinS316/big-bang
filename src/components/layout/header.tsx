"use client";

import React from "react";
import { cn } from "~/lib/utils";
import { Breadcrumb } from "./breadcrumb";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn("bg-background h-14 w-full shadow-sm", className)}>
      <div className="container mx-auto px-4 py-4">
        <Breadcrumb />
      </div>
    </header>
  );
};

export default Header;
