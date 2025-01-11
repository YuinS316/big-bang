"use client";

import * as React from "react";

import { cn } from "~/lib/utils";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { useLayoutEffect, useRef, useState } from "react";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
    value?: string;
  }
>(({ className, ...props }, ref) => {
  const [activeRect, setActiveRect] = useState<DOMRect | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  // 使用 useLayoutEffect 避免视觉闪烁
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const updateActiveRect = () => {
      const activeTab = list.querySelector(
        '[data-state="active"]',
      )!;
      if (activeTab) {
        const rect = activeTab.getBoundingClientRect();
        const listRect = list.getBoundingClientRect();

        setActiveRect({
          width: rect.width,
          // 相对于 TabsList 的位置
          left: rect.left - listRect.left,
          height: rect.height,
          top: rect.top - listRect.top,
        } as DOMRect);
      }
    };

    updateActiveRect();

    // 监听窗口大小变化
    window.addEventListener("resize", updateActiveRect);

    return () => {
      window.removeEventListener("resize", updateActiveRect);
    };
  }, [props.value]); // 当选中值改变时更新位置

  return (
    <TabsPrimitive.List
      ref={(node) => {
        // 合并 refs
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
        if (listRef) {
          listRef.current = node;
        }
      }}
      className={cn(
        "bg-muted text-muted-foreground relative inline-flex h-10 items-center justify-center rounded-md p-1",
        className,
      )}
      {...props}
    >
      {/* 动画背景条 */}
      {activeRect && (
        <div
          className="absolute z-0 rounded-sm bg-white shadow-sm transition-all duration-300 ease-in-out"
          style={{
            left: activeRect.left,
            top: activeRect.top,
            width: activeRect.width,
            height: activeRect.height,
          }}
        />
      )}
      {props.children}
    </TabsPrimitive.List>
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "relative z-10 inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5",
      "text-sm font-medium transition-all",
      "text-muted-foreground data-[state=active]:text-foreground",
      "focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "ring-offset-background focus-visible:ring-ring mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
