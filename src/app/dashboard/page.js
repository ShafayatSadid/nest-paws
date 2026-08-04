"use client";

import Link from "next/link";
import { FaPlus, FaList, FaClipboardList } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { useEffect } from "react";

export default function DashboardHomePage() {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    useEffect(() => {
        document.title = "Dashboard | Nest Paws";

    }, []);
    
    return (
        <div className="max-w-4xl mx-auto">
            {/* 👋 Welcome Section */}
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                    Welcome back, <span className="text-primary">{user?.name || "User"}!</span>
                </h1>
                <p className="text-muted mt-1">
                    Here&apos;s a quick overview of your dashboard. Choose an action below to get started.
                </p>
            </div>

            {/* 🚀 Quick Actions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Add New Pet */}
                <Link href="/dashboard/add-pet">
                    <div className="bg-background border border-muted/20 dark:border-muted/10 rounded-2xl p-6 text-center hover:shadow-md transition hover:-translate-y-1 cursor-pointer group">
                        <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition">
                            <FaPlus className="text-primary text-xl" />
                        </div>
                        <h3 className="font-heading font-semibold text-foreground">Add New Pet</h3>
                        <p className="text-sm text-muted mt-1">List a pet for adoption</p>
                    </div>
                </Link>

                {/* My Listings */}
                <Link href="/dashboard/my-listings">
                    <div className="bg-background border border-muted/20 dark:border-muted/10 rounded-2xl p-6 text-center hover:shadow-md transition hover:-translate-y-1 cursor-pointer group">
                        <div className="w-12 h-12 rounded-full bg-secondary/10 dark:bg-secondary/20 flex items-center justify-center mx-auto mb-3 group-hover:bg-secondary/20 transition">
                            <FaList className="text-secondary text-xl" />
                        </div>
                        <h3 className="font-heading font-semibold text-foreground">My Listings</h3>
                        <p className="text-sm text-muted mt-1">View your listed pets</p>
                    </div>
                </Link>

                {/* My Requests */}
                <Link href="/dashboard/my-requests">
                    <div className="bg-background border border-muted/20 dark:border-muted/10 rounded-2xl p-6 text-center hover:shadow-md transition hover:-translate-y-1 cursor-pointer group">
                        <div className="w-12 h-12 rounded-full bg-accent/20 dark:bg-accent/20 flex items-center justify-center mx-auto mb-3 group-hover:bg-accent/30 transition">
                            <FaClipboardList className="text-accent dark:text-accent text-xl" />
                        </div>
                        <h3 className="font-heading font-semibold text-foreground">My Requests</h3>
                        <p className="text-sm text-muted mt-1">Track adoption requests</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}