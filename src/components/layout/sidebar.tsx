"use client";

import React, { useState, useEffect } from "react";
import { cn } from "~/lib/utils";
import { Settings, User, ChevronLeft, ChevronRight } from "lucide-react";
import { CollapsingText } from "../ui";
import { menuList } from "~/constants/routerMap";
import { usePathname, useRouter } from "next/navigation";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
  path?: string;
  onClick?: () => void;
}

const SidebarItem = ({
  icon,
  label,
  isCollapsed,
  path,
  onClick,
}: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = pathname.startsWith(path ?? "");

  const handleClick = () => {
    if (onClick) {
      onClick();
    }

    if (path) {
      router.push(path);
    }
  };

  return (
    <div
      className={cn(
        "flex cursor-pointer items-center space-x-4 rounded-lg p-3 transition-all",
        isCollapsed && "space-x-0",
        isActive
          ? "bg-foreground text-white"
          : "text-gray-700 hover:bg-gray-100",
      )}
      onClick={handleClick}
    >
      <div className="ml-1">{icon}</div>
      <div
        className={cn(
          "h-5 overflow-hidden text-sm font-bold transition-all duration-300",
          isCollapsed ? "hidden max-w-0" : "max-w-auto",
        )}
      >
        {label}
      </div>
    </div>
  );
};

const SidebarHeader = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const router = useRouter();
  return (
    <div className="mb-2">
      {/* Logo 和标题区域 */}
      <div className="flex cursor-default items-center gap-3 px-2 py-1">
        <div className={cn("relative w-full transition-all duration-300")}>
          <div
            className="absolute left-0 top-0 z-10 h-full w-full cursor-pointer bg-transparent"
            onClick={() => router.push("/")}
          ></div>
          <CollapsingText
            collapsedText="BB"
            unCollapsedText="BigBang"
            isCollapsed={isCollapsed}
            className={cn("h-10 text-nowrap font-pacifico text-2xl")}
          />
        </div>
      </div>

      {/* 分割线 */}
      <div className="mx-2 border-b border-gray-200" />
    </div>
  );
};

const Sidebar = () => {
  const router = useRouter();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [height, setHeight] = useState("100vh");

  useEffect(() => {
    const updateHeight = () => {
      setHeight(`${window.innerHeight}px`);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={cn(
        "sticky top-0 flex h-screen flex-col bg-white px-5 py-3 shadow-lg transition-all duration-300",
        "h-[100dvh]",
        isCollapsed ? "w-24" : "w-44",
      )}
      style={{ height }}
    >
      {/* 折叠按钮 */}
      <button
        onClick={toggleCollapse}
        className="absolute -right-4 top-6 rounded-full bg-white p-1.5 shadow-md"
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" color="black" />
        ) : (
          <ChevronLeft className="h-4 w-4" color="black" />
        )}
      </button>

      {/* 顶部区域 */}
      <SidebarHeader isCollapsed={isCollapsed} />

      {/* 中间区域 */}

      <div className="flex-1 space-y-2">
        {menuList.map((item) => (
          <SidebarItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            isCollapsed={isCollapsed}
            path={item.path}
          />
        ))}
      </div>

      {/* 底部区域 */}
      <div className="space-y-2">
        <div className="mx-2 border-t border-gray-200" />

        <SidebarItem
          icon={<Settings size={24} />}
          label="设置"
          path="/settings"
          isCollapsed={isCollapsed}
        />

        <SidebarItem
          icon={<User size={24} />}
          label="登录"
          isCollapsed={isCollapsed}
          path="/login"
        />
      </div>
    </div>
  );
};

export default Sidebar;
