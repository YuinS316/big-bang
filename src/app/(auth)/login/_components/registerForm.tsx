"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import * as z from "zod";
import { forwardRef, useImperativeHandle } from "react";

// 定义 ref 的类型
export interface RegisterFormRef {
  reset: () => void;
  setError: (name: keyof RegisterFormValues, message: string) => void;
  setValue: (name: keyof RegisterFormValues, value: string) => void;
  getValues: () => RegisterFormValues;
}

const registerSchema = z
  .object({
    username: z.string().min(1, "请输入账号"),
    password: z.string().min(6, "密码至少6位"),
    confirmPassword: z.string().min(6, "请确认密码"),
    email: z.string().email("请输入有效的邮箱"),
    captcha: z.string().min(4, "请输入验证码"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "两次输入的密码不一致",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSubmit: (values: RegisterFormValues) => void;
  className?: string;
}

export const RegisterForm = forwardRef<RegisterFormRef, RegisterFormProps>(
  ({ onSubmit, className }, ref) => {
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

    // 暴露方法给父组件
    useImperativeHandle(ref, () => ({
      reset: () => registerForm.reset(),
      setError: (name, message) =>
        registerForm.setError(name, { type: "manual", message }),
      setValue: (name, value) => registerForm.setValue(name, value),
      getValues: () => registerForm.getValues(),
    }));

    return (
      <Form {...registerForm}>
        <form
          onSubmit={registerForm.handleSubmit(onSubmit)}
          className={cn("space-y-6", className)}
        >
          <FormField
            control={registerForm.control}
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
            control={registerForm.control}
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
            control={registerForm.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>确认密码</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="请再次输入密码"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={registerForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>邮箱</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="请输入邮箱" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={registerForm.control}
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

          <Button type="submit" className="mt-4 w-full">
            注册
          </Button>
        </form>
      </Form>
    );
  },
);
