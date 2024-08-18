import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { FoodContext } from "../contexts/FoodContext";
import { FoodData } from "../interface/FoodData";
import Counter from "./Counter";
import CurrencyFormatter from "./CurrencyFormatter";
import FoodDetails from "./FoodDetails";
import { toURL } from "../services/image";

interface CardProps {
  food: FoodData;
}

export default function CardTest({ food }: CardProps) {

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between w-full">
        <CardTitle className="text-xl">{food.title}</CardTitle>
      </CardHeader>
      <CardContent className="relative m-6 h-[150px]">
        <Image
          src={food.image}
          alt="food-image"
          className="rounded-md"
          fill={true}
        />
      </CardContent>
      <CardFooter>
        <div className="w-full items-center flex justify-between">
          <p className="font-semibold text-md">
            <CurrencyFormatter value={food.price} />
          </p>
          {/* <Button variant="ghost">
            <Counter food={food} />
          </Button> */}
          <FoodDetails food={food} />
        </div>
      </CardFooter>
    </Card>
  );
}
