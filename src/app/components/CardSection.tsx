"use client";
import React from "react";
import Card from "./Card";
import CardTest from "./CardTest";
import { useFoodData } from "@/app/hooks/useFoodData";

export default function CardSection() {
  const { data } = useFoodData();

  return (
    <div className="flex items-center justify-center container mx-auto">
      <div className="m-6 grid grid-flow-col gap-6">
        {data?.map((food) => (
          <CardTest
            key={food.id}
            title={food.title}
            price={food.price}
            image={food.image}
          />
        ))}
      </div>
    </div>
  );
}
