"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, SignInSchemaType } from "@/schemas/auth.schema";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUserLogin } from "@/redux/slices/authSlice";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      role: "ADMIN",
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<SignInSchemaType> = async (
    data: SignInSchemaType,
  ) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/${data.role === "ADMIN" ? "admin" : "operator"}/login`,
        { email: data.email, password: data.password },
        { withCredentials: true },
      );

      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUserLogin(response.data));
        router.push(
          `${data.role === "ADMIN" ? "/admin/dashboard" : "/operator/dashboard"}`,
        );
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Internal Server Error");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl border bg-card shadow-xl md:grid-cols-2">
        {/* Left Side */}
        <div className="flex flex-col justify-center p-6 sm:p-8">
          <div className="mb-5 text-center md:text-left">
            <h1 className="text-2xl font-mono font-bold tracking-tight">
              Sign In
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Access your account and manage your support operations.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
            {/* Role */}
            <div className="space-y-1">
              <Label className="text-sm font-medium">Role</Label>

              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="h-10 w-full">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="OPERATOR">Operator</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />

              <p className="h-2 pl-1 text-[11px] text-destructive">
                {errors.role?.message}
              </p>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="name@example.com"
                  {...register("email")}
                  className="h-10 pl-10"
                />
              </div>
              <p className="h-2 pl-1 text-[11px] text-destructive">
                {errors.email?.message}
              </p>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="password"
                  autoComplete="current-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password")}
                  className="h-10 pl-10 pr-10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <p className="h-2 pl-1 text-[11px] text-destructive">
                {errors.password?.message}
              </p>
            </div>

            {/* <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Forgot Password?
              </Link>
            </div> */}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-10 w-full text-sm font-semibold"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-blue-600 hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>

        {/* Right Side */}
        <div className="relative hidden md:block">
          <Image
            src="/illustration.jpg"
            alt="Sign in illustration"
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default SignIn;
