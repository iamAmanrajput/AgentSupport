"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SubmitHandler, useForm } from "react-hook-form";
import { signupSchema, SignupSchemaType } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<SignupSchemaType> = async (
    data: SignupSchemaType,
  ) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/admin/register`,
        { name: data.name, email: data.email, password: data.password },
        { withCredentials: true },
      );

      if (response.data.success) {
        toast.success(response.data.message);
        router.push("/admin/dashboard");
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
              Create Account
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Join us and start managing your support operations.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
            {/* Name */}
            <div className="space-y-1">
              <Label htmlFor="name" className="text-sm font-medium">
                Name
              </Label>

              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="name"
                  autoComplete="name"
                  placeholder="John Doe"
                  {...register("name")}
                  className="h-10 pl-10"
                />
              </div>

              <p className="h-2 pl-1 text-[11px] text-destructive">
                {errors.name?.message}
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
                  className="h-10 pl-10 "
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
                  autoComplete="new-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  {...register("password")}
                  className="h-10 pl-10 pr-10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground hover:cursor-pointer"
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

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-10 w-full text-sm font-semibold"
            >
              {isSubmitting ? "Creating..." : "Create Account"}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="font-medium text-blue-600 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>

        {/* Right Side */}
        <div className="relative hidden md:block">
          <Image
            src="/illustration.jpg"
            alt="Sign up illustration"
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default SignUp;
