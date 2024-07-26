"use client";
import Link from "next/link";
import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import UserMenu from "./UserMenu";

export default function Navbar() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <nav className="shadow-md bg-primary w-full h-12">
      <div className="flex justify-between h-full items-center md:mx-20 sm:mx-10 mx-5">
        <h2 className="text-primary-foreground">
          <Link href="/">Ricardo Lanches</Link>
        </h2>
        {!isAuthenticated && (
          <Link className="text-accent" href="/login">
            Login
          </Link>
        )}
        {isAuthenticated && <UserMenu />}
      </div>
    </nav>
  );
}
