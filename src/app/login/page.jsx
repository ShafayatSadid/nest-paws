"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Form, Button, Input, Label, FieldError, TextField } from "@heroui/react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    setLoading(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email: user.email,
        password: user.password,
      });

      if (data) {
        toast.success("Welcome back!");
        router.push("/");
        return;
      }

      toast.error(error?.message || "Login failed");
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const signInGoogle = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  };
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-5 py-12 my-20 bg-background">
      <div className="max-w-md w-full bg-transparent rounded-2xl p-8 shadow-lg border border-muted/20 dark:border-muted/10">
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl font-extrabold text-foreground">Welcome Back</h1>
          <p className="font-body text-muted mt-2">Login to your account</p>
        </div>

        <Form className="space-y-5" onSubmit={onSubmit}>
          {/* Email */}
          <TextField
            isRequired
            name="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label className="font-body text-sm font-medium text-foreground">Email</Label>
            <Input
              name="email"
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 rounded-xl border border-muted/30 dark:border-muted/20 bg-transparent text-foreground focus:outline-none focus:border-primary transition"
            />
            <FieldError className="font-body text-xs text-danger mt-1" />
          </TextField>

          {/* Password */}
          <TextField
            isRequired
            name="password"
            type={isShowPassword ? "text" : "password"}
            validate={(value) => {
              if (!value || value.length === 0) return "Password is required";
              return null;
            }}
          >
            <Label className="font-body text-sm font-medium text-foreground">Password</Label>
            <div className="relative">
              <Input
                name="password"
                type={isShowPassword ? "text" : "password"}
                placeholder=""
                className="w-full px-4 py-2.5 rounded-xl border border-muted/30 dark:border-muted/20 bg-transparent text-foreground focus:outline-none focus:border-primary transition pr-12"
              />
              <button
                type="button"
                onClick={() => setIsShowPassword(!isShowPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition"
              >
                {isShowPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
              </button>
            </div>
            <FieldError className="font-body text-xs text-danger mt-1" />
          </TextField>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-dark text-white font-heading font-semibold py-2.5 rounded-xl transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-muted/20"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-background text-muted">OR</span>
          </div>
        </div>

        <button
          onClick={signInGoogle}
          className="w-full flex items-center cursor-pointer justify-center gap-3 border border-muted/30 dark:border-muted/20 hover:border-primary/50 text-foreground font-body font-medium py-2.5 rounded-xl transition"
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