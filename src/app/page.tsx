"use client";
import CardSection from "./components/CardSection";
import Header from "./components/Header";
import TypeSection from "./components/TypeSection";

export default function Home() {
  return (
    <>
      <div className="pt-4 flex flex-col items-center">
        <Header />
        <TypeSection />
        <CardSection />
      </div>
    </>
  );
}
