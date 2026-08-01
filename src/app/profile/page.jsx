"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Form, Button, Input, Label, FieldError, TextField } from "@heroui/react";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
    const router = useRouter();
    
    const [loading, setLoading] = useState(false);

    const {data: session} = authClient.useSession()
    const user = session?.user;

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

    
    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-5 py-12 my-20 bg-background">
            <div className="max-w-md w-full bg-transparent rounded-2xl p-8 shadow-lg border border-muted/20 dark:border-muted/10">
                <div className="text-center mb-8">
                    <h1 className="font-heading text-3xl font-extrabold text-foreground">Welcome Back</h1>
                    <p className="font-body text-muted mt-2">Login to your account</p>
                </div>

                <Form className="space-y-5" onSubmit={onSubmit}>

                    {/* Name */}

                    <TextField
                        isRequired
                        name="name"
                        defaultValue={user?.name}
                        validate={(value) => {
                            if (!value || value.trim().length === 0) return "Name is required";
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


                    {/* Email */}
                    <TextField
                        isRequired
                        name="email"
                        defaultValue={user?.email}
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

                    {/* Photo URL (optional) */}
                    <TextField name="photoURL"
                    defaultValue={user?.image}>
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
                    {/* submit */}
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary hover:bg-primary-dark text-white font-heading font-semibold py-2.5 rounded-xl transition disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Update Your Profile"}
                    </Button>
                </Form>


            </div>
        </div>
    );
}