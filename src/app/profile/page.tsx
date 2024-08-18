"use client";
import React, { useContext } from "react";
import FormUser from "./components/FormUser";

export default function page() {
  return (
    <main className="min-h-[calc(100vh-48px)] flex items-center justify-center">
      <div className="w-3/4 sm:w-1/3 h-fit p-6 rounded-md shadow-md bg-secondary flex flex-col items-center justify-center">
        <FormUser />
      </div>
    </main>
  );
}
