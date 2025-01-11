"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";
import { forwardRef, useImperativeHandle } from "react";

// 定义 ref 的类型
export interface LoginFormRef {
  reset: () => void;
  setError: (name: keyof LoginFormValues, message: string) => void;
  setValue: (name: keyof LoginFormValues, value: string) => void;
  getValues: () => LoginFormValues;
}

// 登录表单验证 Schema
const loginSchema = z.object({
  username: z.string().min(1, "请输入账号"),
  password: z.string().min(6, "密码至少6位"),
  captcha: z.string().min(4, "请输入验证码"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => void;
  className?: string;
}

export const LoginForm = forwardRef<LoginFormRef, LoginFormProps>(
  ({ onSubmit, className }, ref) => {
    const form = useForm<LoginFormValues>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
        username: "",
        password: "",
        captcha: "",
      },
    });

    // 暴露方法给父组件
    useImperativeHandle(ref, () => ({
      reset: () => form.reset(),
      setError: (name, message) =>
        form.setError(name, { type: "manual", message }),
      setValue: (name, value) => form.setValue(name, value),
      getValues: () => form.getValues(),
    }));

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn("space-y-6", className)}
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>账号</FormLabel>
                <FormControl>
                  <Input placeholder="请输入账号" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>密码</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="请输入密码" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="captcha"
            render={({ field }) => (
              <FormItem>
                <FormLabel>验证码</FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <Input placeholder="请输入验证码" {...field} />
                  </FormControl>
                  <Button type="button" variant="outline">
                    获取验证码
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            登录
          </Button>
        </form>
      </Form>
    );
  },
);
