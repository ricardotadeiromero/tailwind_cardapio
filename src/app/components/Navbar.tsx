"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="shadow-md bg-gradient-to-r from-orange-500 to-orange-600 w-full h-12">
      <div className="flex justify-between h-full items-center md:mx-20 sm:mx-10 mx-5">
        <h2>Crado Lanches</h2>
        <Button onClick={() => router.push("/login")} variant={"ghost"}>
          Login
        </Button>
      </div>
    </nav>
  );
}
