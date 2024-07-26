"use client";
import CardSection from "./components/CardSection";
import Header from "./components/Header";
import NewModal from "./components/NewModal";

export default function Home() {
  return (
    <>
      <div className="w-full p-6 mx-auto flex flex-col items-center">
        <Header/>
        <CardSection />
      </div>
    </>
  );
}
