"use client";
import Link from "next/link";
import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import UserMenu from "./UserMenu";
import { SheetRequests } from "./SheetRequests";
import PrivateMenus from "./PrivateMenus";
import { usePathname } from "next/navigation";
import { Sidebar } from "./sidebar/sidebar";

export default function Navbar() {
  const { isAuthenticated } = useContext(AuthContext);
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return <Sidebar />;
  }
  return (
    <nav className="shadow-md bg-primary w-full h-12">
      <div className="flex justify-between h-full items-center md:mx-20 sm:mx-10 mx-5">
        <h2 className="text-primary-foreground">
          <Link href="/">Lanche's </Link>
        </h2>
        <div className="flex items-center justify-center gap-3">
          <PrivateMenus />
        </div>
      </div>
    </nav>
  );
}
