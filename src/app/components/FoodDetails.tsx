import React, { useState } from "react";
import { FoodData } from "../interface/FoodData";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Counter from "./Counter";
import { useMediaQuery } from "../hooks/use-media-query";
import { toURL } from "../services/image";

interface FoodDetailsProps {
  food: FoodData;
}

export default function FoodDetails({ food }: FoodDetailsProps) {
  const [open, setOpen] = useState<boolean>(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>Ver</DialogTrigger>
        <DialogContent className="max-w-[1000px] grid grid-cols-2">
          <DialogHeader>
            <DialogTitle>{food.title}</DialogTitle>
            <DialogDescription>
              <p>{food.description}</p>
              <h3 className="text-base py-1 text-primary">Ingredientes:</h3>
              <p>{food.ingredients}</p>
            </DialogDescription>
          </DialogHeader>
          <div className="h-[300px] relative">
            <Image
              src={food.image}
              alt="food-image"
              className="rounded-md"
              fill={true}
            />
          </div>
          <div></div>
          <Counter setOpen={setOpen} food={food} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger>Ver</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{food.title}</DrawerTitle>
          <DrawerDescription>
            <p>{food.description}</p>
            <h3 className="text-base py-1 text-primary">Ingredientes:</h3>
            <p>{food.ingredients}</p>
          </DrawerDescription>
        </DrawerHeader>
        <div className="h-[200px] w-[300px] relative mx-auto">
          <Image
            src={food.image}
            alt="food-image"
            className="rounded-md"
            fill={true}
          />
        </div>
        <DrawerFooter>
          <DrawerClose>
            <Counter setOpen={setOpen} food={food} />
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
