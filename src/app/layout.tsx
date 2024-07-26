import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css";
import ReactQueryClientProvider from "./ReactQueryClientProvider";
import AuthProvider from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crado's Lanche",
  description: "Hamburgueria",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactQueryClientProvider>
        <AuthProvider>
          <body className={inter.className}>
            <Navbar />
            {children}
            <Toaster />
          </body>
        </AuthProvider>
      </ReactQueryClientProvider>
    </html>
  );
}
