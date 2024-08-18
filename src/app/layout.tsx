import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css";
import ReactQueryClientProvider from "./ReactQueryClientProvider";
import AuthProvider from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import FoodProvider from "./contexts/FoodContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Straw's ",
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
          <FoodProvider>
            <body className={inter.className}>
              <Navbar />
              {children}
              <Toaster />
            </body>
          </FoodProvider>
        </AuthProvider>
      </ReactQueryClientProvider>
    </html>
  );
}
