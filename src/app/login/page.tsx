import React from "react";
import FormLogin from "./components/formLogin";
import logo from "../../../public/hamburguer.png";
import Image from "next/image";

export default function Login() {
  return (
    <main className="w-full h-full flex items-center justify-center">
      <div className="w-3/4 sm:w-1/3 h-fit p-6 rounded-md shadow-md bg-orange-50 flex flex-col items-center justify-center">
        <Image src={logo} width={200} alt="logo" height={100} />
        <FormLogin />
      </div>
    </main>
  );
}
