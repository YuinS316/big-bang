"use client";

import React from "react";
import { cn } from "~/lib/utils";

interface CollapsingTextProps {
  collapsedText: string;
  unCollapsedText: string;
  isCollapsed: boolean;
  className?: string;
}
export const CollapsingText = ({
  collapsedText,
  unCollapsedText,
  isCollapsed,
  className,
}: CollapsingTextProps) => {
  const unit = Math.ceil(300 / (collapsedText.length + unCollapsedText.length)); // 默认时间单位

  const defaultDelay = 200;

  // 计算过渡延迟
  const getDelay = (index: number, isCollapsedText: boolean) => {
    if (isCollapsed) {
      // 收起时：从右往左收起展开文本，再显示收起文本
      if (!isCollapsedText) {
        // 展开文本从右往左消失
        return `${(unCollapsedText.length - index - 1) * unit}ms`;
      } else {
        // 等待展开文本全部消失后，收起文本再显示
        return `${unCollapsedText.length * unit + index * unit + defaultDelay}ms`;
      }
    } else {
      // 展开时：先隐藏收起文本，再显示展开文本
      if (isCollapsedText) {
        // 收起文本先消失
        return `${index * unit}ms`;
      } else {
        // 等待收起文本全部消失后，展开文本再显示
        return `${collapsedText.length * unit + index * unit + defaultDelay}ms`;
      }
    }
  };

  return (
    <div className={cn("relative flex w-full", className)}>
      {/* 收起状态的文本 */}
      <div className="absolute left-0 flex">
        {collapsedText.split("").map((char, index) => (
          <div
            key={`collapsed-${index}`}
            className={cn("collapse-text")}
            hidden={!isCollapsed}
            style={{
              transitionDelay: getDelay(index, true),
            }}
          >
            {char === " " ? "\u00A0" : char}
          </div>
        ))}
      </div>

      {/* 展开状态的文本 */}
      <div className="absolute left-0 flex">
        {unCollapsedText.split("").map((char, index) => (
          <div
            key={`uncollapsed-${index}`}
            className={cn("collapse-text")}
            hidden={isCollapsed}
            style={{
              transitionDelay: getDelay(index, false),
            }}
          >
            {char === " " ? "\u00A0" : char}
          </div>
        ))}
      </div>
    </div>
  );
};
