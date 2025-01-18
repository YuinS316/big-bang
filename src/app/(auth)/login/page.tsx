"use client";

import * as React from "react";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  Card,
  CardContent,
} from "~/components/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "~/lib/utils";
import { CollapsingText } from "~/components/ui";
import {
  LoginForm,
  type LoginFormRef,
} from "~/app/(auth)/login/_components/loginForm";
import {
  RegisterForm,
  type RegisterFormRef,
} from "~/app/(auth)/login/_components/registerForm";
import { Metadata } from "next";

// 登录表单验证 Schema
const loginSchema = z.object({
  username: z.string().min(1, "请输入账号"),
  password: z.string().min(6, "密码至少6位"),
  captcha: z.string().min(4, "请输入验证码"),
});

// 注册表单验证 Schema
const registerSchema = z
  .object({
    username: z.string().min(1, "请输入账号"),
    password: z.string().min(6, "密码至少6位"),
    confirmPassword: z.string().min(6, "请再次输入密码"),
    email: z.string().email("请输入有效的邮箱地址"),
    captcha: z.string().min(4, "请输入验证码"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "两次输入的密码不一致",
    path: ["confirmPassword"],
  });

export default function LoginPage() {
  // 登录表单
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      captcha: "",
    },
  });

  // 注册表单
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      captcha: "",
    },
  });

  // 登录提交处理
  const onLoginSubmit = (values: z.infer<typeof loginSchema>) => {
    console.log(values);
  };

  // 注册提交处理
  const onRegisterSubmit = (values: z.infer<typeof registerSchema>) => {
    console.log(values);
  };

  const [tabValue, setTabValue] = React.useState("login");

  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const timer = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    timer.current = setInterval(() => {
      setIsCollapsed((state) => {
        return !state;
      });
    }, 3000);

    return () => {
      if (timer.current) {
        clearInterval(timer.current);
        timer.current = null;
      }
    };
  }, []);

  const loginFormRef = React.useRef<LoginFormRef>(null);
  const registerFormRef = React.useRef<RegisterFormRef>(null);

  // 处理 tab 切换
  const handleTabChange = (value: string) => {
    setTabValue(value);
    if (value === "login") {
      loginFormRef.current?.reset();
    } else {
      registerFormRef.current?.reset();
    }
  };

  return (
    <div className="flex w-full flex-col px-4 py-8 lg:max-w-[550px]">
      <div className={cn("font-pacifico h-12 text-4xl")}>
        <CollapsingText
          collapsedText="Help you study English more easily"
          unCollapsedText="BigBang"
          isCollapsed={isCollapsed}
        ></CollapsingText>
      </div>

      <div className={cn("mx-auto mt-8 h-[580px] w-full max-w-md")}>
        <Card
          className={cn(
            "w-full border border-white/30 bg-white/30 backdrop-blur-md",
            // "transition-[height] duration-300",
            tabValue === "login" ? "h-[400px]" : "h-[580px]",
          )}
        >
          <CardContent>
            <Tabs
              value={tabValue}
              defaultValue="login"
              className="mt-4 w-full"
              onValueChange={handleTabChange}
            >
              <TabsList className="grid w-full grid-cols-2" value={tabValue}>
                <TabsTrigger value="login">登录</TabsTrigger>
                <TabsTrigger value="register">注册</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="relative mt-4">
              {/* 登录表单 */}

              <div
                className={cn(
                  "absolute w-full transition-all duration-300",
                  tabValue === "login"
                    ? "translate-x-0 opacity-100"
                    : "translate-x-[-100%] opacity-0",
                )}
              >
                <LoginForm onSubmit={onLoginSubmit} ref={loginFormRef} />
              </div>

              {/* 注册表单 */}
              <div
                className={cn(
                  "absolute w-full transition-all duration-300",
                  tabValue === "register"
                    ? "translate-x-0 opacity-100"
                    : "translate-x-[100%] opacity-0",
                )}
              >
                <RegisterForm
                  onSubmit={onRegisterSubmit}
                  ref={registerFormRef}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
