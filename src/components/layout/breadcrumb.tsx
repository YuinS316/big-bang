"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { useMemo } from "react";
import { routeNameMap } from "~/constants/routerMap";

interface BreadcrumbProps {
  className?: string;
  // 可选：自定义某些路径是否显示
  hideOnPaths?: string[];
  // 可选：额外的路由映射
  extraRouteNames?: Record<string, string>;
}

export const Breadcrumb = ({
  className,
  hideOnPaths = ["/"],
  extraRouteNames = {},
}: BreadcrumbProps) => {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    // 如果在隐藏路径列表中，返回空
    if (hideOnPaths.includes(pathname)) {
      return [];
    }

    // 合并路由名称映射
    const allRouteNames = { ...routeNameMap, ...extraRouteNames };

    // 分割路径
    const segments = pathname.split("/").filter(Boolean);

    // 生成面包屑项
    return segments.map((segment, index) => {
      // 构建当前层级的完整路径
      const path = `/${segments.slice(0, index + 1).join("/")}`;

      // 获取显示名称：优先使用映射表中的名称，否则使用路径名
      const name = allRouteNames[segment] ?? segment;

      return {
        name,
        path,
        isLast: index === segments.length - 1,
      };
    });
  }, [pathname, hideOnPaths, extraRouteNames]);

  return (
    <nav className={className}>
      <ol className="flex items-center space-x-2">
        {/* 首页 */}
        <li>
          <Link
            href="/"
            className="flex items-center text-gray-500 hover:text-gray-700"
          >
            首页
          </Link>
        </li>
        {/* 分隔符 */}
        {breadcrumbs.length > 0 && (
          <ChevronRight className="h-4 w-4 text-gray-400" />
        )}
        {/* 面包屑项 */}
        {breadcrumbs.map((item, index) => (
          <li key={item.path} className="flex items-center">
            {item.isLast ? (
              <span className="text-gray-900">{item.name}</span>
            ) : (
              <>
                <Link
                  href={item.path}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {item.name}
                </Link>
                <ChevronRight className="ml-2 h-4 w-4 text-gray-400" />
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
