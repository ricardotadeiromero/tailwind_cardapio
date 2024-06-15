import { Button } from "@/components/ui/button";
import CardSection from "./components/CardSection";
import NewCard from "./components/NewCard";
import NewModal from "./components/NewModal";
import Navbar from "./components/Navbar";

export default function Home() {
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
