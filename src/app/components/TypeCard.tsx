import React from "react";
import { FoodType } from "../interface/FoodType";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TypeCardProps {
  type: FoodType;
}

export default function TypeCard({ type }: TypeCardProps) {
  return (
    <Card>
      <a href={"#" + type.name}>
        <CardContent className="bg-secondary rounded-sm flex p-0 text-center items-center justify-center">
          <p className="my-3">{type.name}</p>
        </CardContent>
      </a>
    </Card>
  );
}
