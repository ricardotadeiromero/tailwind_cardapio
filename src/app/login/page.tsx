import React from "react";
import FormLogin from "./components/formLogin";
import logo from "../../../public/hamburguer.png";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FormRegister from "./components/formRegister";

export default function Login() {
  return (
    <main className="min-h-[calc(100vh-48px)] flex items-center justify-center">
      <div className="w-3/4 sm:w-1/3 h-fit p-6 rounded-md shadow-md bg-secondary flex flex-col items-center justify-center">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="account">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent className="flex flex-col items-center" value="login">
            <Image src={logo} width={200} alt="logo" height={100} />
            <FormLogin />
          </TabsContent>
          <TabsContent className="flex flex-col items-center" value="account">
            <Image src={logo} width={200} alt="logo" height={100} />
            <FormRegister />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
