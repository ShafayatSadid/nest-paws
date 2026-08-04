"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { 
  FaList, 
  FaPlus, 
  FaClipboardList, 
  FaBars, 
  FaTimes,
  FaUser
} from "react-icons/fa";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const tabs = [
    {
      id: "my-requests",
      label: "My Requests",
      icon: FaClipboardList,
      href: "/dashboard/my-requests",
    },
    {
      id: "add-pet",
      label: "Add Pet",
      icon: FaPlus,
      href: "/dashboard/add-pet",
    },
    {
      id: "my-listings",
      label: "My Listings",
      icon: FaList,
      href: "/dashboard/my-listings",
    },
  ];

  if (isPending) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-background">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col md:flex-row bg-background mt-20">

      {/* mobile header */}
      <div className="md:hidden flex items-center justify-between px-5 py-3 bg-background border-b border-gray-200 dark:border-gray-700">
        <h2 className="font-heading text-lg font-bold text-foreground">Dashboard</h2>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-foreground hover:text-primary transition"
        >
          {isSidebarOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* side bar */}
      <aside
        className={`
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0
          fixed md:relative
          top-0 left-0
          w-72 h-screen md:h-auto
          bg-background
          border-r border-gray-200 dark:border-gray-700
          p-6
          z-40
          transition-transform duration-300
          flex flex-col
          shadow-2xl md:shadow-none
        `}
      >
        {/* mobile close btn */}
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="md:hidden absolute top-4 right-4 text-foreground hover:text-primary transition"
        >
          <FaTimes size={24} />
        </button>

        {/* title */}
        <div className="mb-6">
          <h2 className="font-heading text-xl font-bold text-foreground">Dashboard</h2>
          <p className="font-body text-sm text-muted">Manage your pets & requests</p>
        </div>

        {/* user profile */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-muted/20 dark:border-muted/10">
          <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary font-heading font-bold text-sm">
            {user?.name?.charAt(0)?.toUpperCase() || <FaUser className="text-primary" />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-body text-sm font-medium text-foreground truncate">
              {user?.name || "User"}
            </p>
            <p className="font-body text-xs text-muted truncate">
              {user?.email || "user@example.com"}
            </p>
          </div>
        </div>

       
        <nav className="flex-1 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = pathname === tab.href;

            return (
              <Link
                key={tab.id}
                href={tab.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition duration-200
                  ${isActive 
                    ? "bg-primary/10 dark:bg-primary/20 text-primary font-semibold" 
                    : "text-foreground hover:bg-muted/10 dark:hover:bg-muted/10"
                  }
                `}
              >
                <Icon className={`size-5 ${isActive ? "text-primary" : "text-muted"}`} />
                <span className="font-body text-sm">{tab.label}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-6 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </nav>

       
        <div className="pt-4 mt-4 border-t border-muted/20 dark:border-muted/10">
          <Link
            href="/profile"
            className="flex items-center gap-3 px-4 py-2 rounded-xl text-muted hover:text-primary hover:bg-muted/10 dark:hover:bg-muted/10 transition"
          >
            <FaUser className="size-4" />
            <span className="font-body text-sm">Profile</span>
          </Link>
        </div>
      </aside>

      
      <main className="flex-1 p-5 lg:p-8 overflow-y-auto bg-background min-h-[calc(100vh-80px)]">
        {children}
      </main>

     
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}