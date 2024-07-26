import React from "react";
import FormFood from "./FormFood";
import { FoodData } from "@/app/interface/FoodData";

interface MainContainerProps {
  foodData?: FoodData | null;
}

export default function MainContainer({ foodData }: MainContainerProps) {
  return (
    <div className="container mx-auto px-10 py-10 bg-secondary shadow-md">
      <FormFood foodData={foodData} />
    </div>
  );
}
