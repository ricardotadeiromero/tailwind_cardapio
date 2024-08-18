"use client";
import React from "react";
import { useTypeData } from "../hooks/type/useTypeData";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import TypeCard from "./TypeCard";

export default function TypeSection() {
  const { data } = useTypeData();
  return (
    <div className="container">
      <Carousel
        opts={{
          align: "center",
        }}
        className="w-full "
      >
        <CarouselContent className="sm:flex items-center justify-center">
          {data.map((type, index) => (
            <CarouselItem
              className="basis-1/2 md:basis-1/3 lg:basis-1/5"
              key={index}
            >
              <TypeCard key={type.id} type={type} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
