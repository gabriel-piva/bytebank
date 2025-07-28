import "@/app/globals.css";
import React from "react";
import SideBar from "./home/components/SideBar/SideBar";

interface AuthLayoutProps {
  children: React.ReactNode;
}
export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex bg-[var(--background)] px-4 py-6">
      <SideBar />
      <div className="w-full flex-1 pl-2 sm:pl-4 md:pl-6">
        <main className="h-full w-full overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
