import CardSection from "./components/CardSection";
import NewModal from "./components/NewModal";
import { parseCookies } from "nookies";
import { api } from "@/app/services/api";
import { redirect } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";

const getToken = async () => {
  const { token } = parseCookies();
  console.log(token);
  if (!token) {
    redirect("/login");
  }
};

export default async function Home() {
  await getToken();
  return (
    <>
      <div className="w-full p-6 mx-auto flex flex-col items-center">
        <h1 className="font-extrabold text-orange-500 text-5xl">
          Crado Lanches
        </h1>
        <div
          className="mt-3 items-center 
        flex gap-6"
        >
          <p>Faça seus pedidos já</p>
          <NewModal />
        </div>
        <CardSection />
      </div>
    </>
  );
}
