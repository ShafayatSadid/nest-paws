"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Form, Button, Input, Label, FieldError, Description, TextField } from "@heroui/react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { authClient } from "@/lib/auth-client";


export default function RegisterPage() {

    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

    const [passwordValue, setPasswordValue] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const user = Object.fromEntries(formData.entries())
        console.log(user, "newUser:");

        const { data, error } = await authClient.signUp.email({
            name: user.name,
            email: user.email,
            password: user.password,
            image: user.photoURL,
        })

        if(data){
            toast('Created your account successfully')
        }
        else{
            toast(error)
        }

    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-5 py-12 my-20 bg-background">
            <div className="max-w-md w-full bg-transparent rounded-2xl p-8 shadow-lg border border-muted/20 dark:border-muted/10">

                <div className="text-center mb-8">
                    <h1 className="font-heading text-3xl font-extrabold text-foreground">Create Account</h1>
                    <p className="font-body text-muted mt-2">Join Nest Paws today</p>
                </div>

                <Form className="space-y-4" onSubmit={onSubmit}>

                    {/* NAME */}
                    <TextField
                        isRequired
                        name="name"
                        validate={(value) => {
                            if (!value || value.trim().length === 0) {
                                return "Name is required";
                            }
                            return null;
                        }}
                    >
                        <Label className="font-body text-sm font-medium text-foreground">Name</Label>
                        <Input
                            name="name"
                            placeholder="John Doe"
                            className="w-full px-4 py-2.5 rounded-xl border border-muted/30 dark:border-muted/20 bg-transparent text-foreground focus:outline-none focus:border-primary transition"
                        />
                        <FieldError className="font-body text-xs text-danger mt-1" />
                    </TextField>

                    {/* EMAIL */}
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

                    {/* PHOTO URL (OPTIONAL) */}
                    <TextField name="photoURL">
                        <Label className="font-body text-sm font-medium text-foreground">
                            Photo URL <span className="text-muted font-normal">(optional)</span>
                        </Label>
                        <Input
                            name="photoURL"
                            type="url"
                            placeholder="https://example.com/photo.jpg"
                            className="w-full px-4 py-2.5 rounded-xl border border-muted/30 dark:border-muted/20 bg-transparent text-foreground focus:outline-none focus:border-primary transition"
                        />
                    </TextField>

                    {/* PASSWORD */}
                    <TextField
                        isRequired
                        name="password"
                        type={isShowPassword ? "text" : "password"}
                        validate={(value) => {
                            if (value.length < 6) {
                                return "Password must be at least 6 characters";
                            }
                            if (!/[A-Z]/.test(value)) {
                                return "Password must contain at least one uppercase letter";
                            }
                            if (!/[a-z]/.test(value)) {
                                return "Password must contain at least one lowercase letter";
                            }
                            return null;
                        }}
                    >
                        <Label className="font-body text-sm font-medium text-foreground">Password</Label>
                        <div className="relative">
                            <Input
                                name="password"
                                type={isShowPassword ? "text" : "password"}
                                placeholder=""
                                onChange={(e) => setPasswordValue(e.target.value)}
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
                        <Description className="font-body text-xs text-muted mt-1">
                            Min 6 chars, 1 uppercase &amp; 1 lowercase
                        </Description>
                        <FieldError className="font-body text-xs text-danger mt-1" />
                    </TextField>

                    {/* CONFIRM PASSWORD */}
                    <TextField
                        isRequired
                        name="confirmPassword"
                        type={isShowConfirmPassword ? "text" : "password"}
                        validate={(value) => {
                            if (value !== passwordValue) {
                                return "Passwords do not match";
                            }
                            return null;
                        }}
                    >
                        <Label className="font-body text-sm font-medium text-foreground">Confirm Password</Label>
                        <div className="relative">
                            <Input
                                name="confirmPassword"
                                type={isShowConfirmPassword ? "text" : "password"}
                                placeholder=""
                                className="w-full px-4 py-2.5 rounded-xl border border-muted/30 dark:border-muted/20 bg-transparent text-foreground focus:outline-none focus:border-primary transition pr-12"
                            />
                            <button
                                type="button"
                                onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition"
                            >
                                {isShowConfirmPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
                            </button>
                        </div>
                        <FieldError className="font-body text-xs text-danger mt-1" />
                    </TextField>

                    <Button
                        type="submit"

                        className="w-full bg-primary hover:bg-primary-dark text-white font-heading font-semibold py-2.5 rounded-xl transition disabled:opacity-50"
                    >
                        Create new account
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
                    onClick={() => toast.info("Google login coming soon!")}
                    className="w-full flex items-center justify-center gap-3 border border-muted/30 dark:border-muted/20 hover:border-primary/50 text-foreground font-body font-medium py-2.5 rounded-xl transition"
                >
                    <FcGoogle className="text-xl" />
                    Continue with Google
                </button>

                <p className="text-center font-body text-sm text-muted mt-6">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary hover:underline font-semibold">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}