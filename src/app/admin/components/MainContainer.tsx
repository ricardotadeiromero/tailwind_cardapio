import React, { ReactNode } from "react";
import FormFood from "../food/components/FormFood";
import { FoodData } from "@/app/interface/FoodData";

interface MainContainerProps {
  children: ReactNode;
}

export default function MainContainer({ children }: MainContainerProps) {
  return (
    <div className="sm:ml-[270px] justify-center flex items-center h-full">
      {children}
    </div>
  );
}
