import React from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import Scrollable from "../ui/scrollable";

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <div className="bg-background text-text h-[100dvh]">
      <div className="flex h-[100dvh]">
        {/* 侧边栏 */}
        <Sidebar />

        {/* 主体部分 */}
        <div className="flex-1">
          <Header className="mb-1 pl-3" />

          {/* 内容区域 - 占满剩余高度且可滚动 */}
          <div className="rounded-custom shadow-custom h-[calc(100vh-5rem)] bg-white">
            <Scrollable className="h-full">
              <div className="h-full min-h-full p-4">{children}</div>
            </Scrollable>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaseLayout;
