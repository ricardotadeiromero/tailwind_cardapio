"use client";
import CardFood from "./CardFood";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { useFoodDataGrouped } from "../hooks/useFoodDataGrouped";
export default function CardSection() {
  const { data, isFetching } = useFoodDataGrouped();

  return (
    <div className="container px-20">
      {!isFetching &&
        Array.from(data!).map(([key, value]) => (
          <div key={key} id={key} className="mt-2">
            <h2 className="font-bold text-lg">{key}</h2>
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full"
              key={key}
            >
              <CarouselContent>
                {value.map((food, index) => (
                  <CarouselItem
                    key={index}
                    className="sm:basis-1/2 md:basis-1/3 lg:basis-1/5"
                  >
                    <CardFood key={food.id} food={food} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselNext />
              <CarouselPrevious />
            </Carousel>
          </div>
        ))}
    </div>
  );
}
