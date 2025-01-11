import React from "react";
import {
  Home,
  Menu,
  Settings,
  User,
  ChevronLeft,
  ChevronRight,
  Bell,
  MessageSquare,
} from "lucide-react";

//  不需要根布局的路由
export const noRootLayoutRoutes = ["/login"];

//  菜单列表
export const menuList = [
  {
    icon: <Home size={24} />,
    label: "首页",
    path: "/",
  },
  { icon: <Menu size={24} />, label: "菜单", path: "/menu" },
  { icon: <Bell size={24} />, label: "通知", path: "/notice" },
  {
    icon: <MessageSquare size={24} />,
    label: "消息",
    path: "/message",
  },
];

// 面包屑对应的路由表
export const routeNameMap: Record<string, string> = menuList.reduce(
  (acc, item) => {
    return {
      ...acc,
      [item.path]: item.label,
    };
  },
  {} as Record<string, string>,
);
