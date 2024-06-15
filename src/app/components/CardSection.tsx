"use client";
import React from "react";
import Card from "./Card";
import { useFoodData } from "../hooks/useFoodData";
import CardTest from "./CardTest";

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
