import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import { VscChromeClose } from "react-icons/vsc";

interface CardProps {
  title: string;
  price: number;
  image: string;
}

export default function CardTest({ title, price, image }: CardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between w-full">
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="relative w-[250px] m-6 h-[200px]">
        <Image
          src={image}
          alt="food-image"
          className="rounded-md"
          fill={true}
        />
      </CardContent>
      <CardFooter>
        <div className="w-full items-center flex justify-between">
          <p className="font-semibold text-md">R${price}</p>
          <Button variant="ghost">Comprar</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
