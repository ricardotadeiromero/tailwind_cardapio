import React from "react";

export default function Main({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-[calc(100vh-48px)] flex items-center justify-center">
      {children}
    </main>
  );
}
