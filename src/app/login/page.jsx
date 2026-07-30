"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

export default function LoginPage() {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // এখানে আপনার লগইন লজিক আসবে
    // উদাহরণ: const result = await loginUser(data.email, data.password);
    console.log("Login Data:", data);
    toast.success("Login successful! (ডেমো)");
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-5 py-12 my-20 bg-background">
      <div className="max-w-md w-full bg-transparent rounded-2xl p-8 shadow-lg border border-muted/20 dark:border-muted/10">

        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl font-extrabold text-foreground">Welcome Back</h1>
          <p className="font-body text-muted mt-2">Login to your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* EMAIL */}
          <div>
            <label className="font-body text-sm font-medium text-foreground block mb-1">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full px-4 py-2.5 rounded-xl border border-muted/30 dark:border-muted/20 bg-transparent text-foreground focus:outline-none focus:border-primary transition"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="font-body text-xs text-danger mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="font-body text-sm font-medium text-foreground block mb-1">Password</label>
            <div className="relative">
              <input
                type={isShowPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                className="w-full px-4 py-2.5 rounded-xl border border-muted/30 dark:border-muted/20 bg-transparent text-foreground focus:outline-none focus:border-primary transition pr-12"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setIsShowPassword(!isShowPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition"
              >
                {isShowPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="font-body text-xs text-danger mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white font-heading font-semibold py-2.5 rounded-xl transition"
          >
            Login
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-muted/20"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-background text-muted">OR</span>
          </div>
        </div>

        <button
          onClick={() => toast.info("Google login coming soon!")}
          className="w-full flex items-center justify-center gap-3 border border-muted/30 dark:border-muted/20 hover:border-primary/50 text-foreground font-body font-medium py-2.5 rounded-xl transition"
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>

        <p className="text-center font-body text-sm text-muted mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary hover:underline font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}