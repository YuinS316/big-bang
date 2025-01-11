"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "~/lib/utils";

interface ScrollableProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  height?: string | number;
  maxHeight?: string | number;
  minHeight?: string | number;
}

const Scrollable = ({
  children,
  height,
  maxHeight,
  minHeight,
  className,
  ...props
}: ScrollableProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // 处理鼠标移入事件
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  // 处理鼠标移出事件
  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 300);
  }, []);

  // 组件卸载时清除定时器
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className={cn(
        "relative overflow-auto",
        // 自定义滚动条样式
        "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-400/50",
        // 仅在悬停时显示滚动条
        isHovered ? "scrollbar-show" : "scrollbar-hide",
        className,
      )}
      style={{
        height,
        maxHeight,
        minHeight,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </div>
  );
};

export default Scrollable;
