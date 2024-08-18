import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FoodData } from "../interface/FoodData";
import { FoodContext } from "../contexts/FoodContext";

interface CounterProps {
  food: FoodData;
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default function Counter({ food, setOpen }: CounterProps) {
  const { addRequest } = useContext(FoodContext);

  const [counter, setCounter] = useState<number>(1);

  function handleRequest() {
    addRequest({ food, amount: counter });
    setOpen(false);
  }

  function addCounter() {
    setCounter((prev) => prev + 1);
  }

  function minusCounter() {
    if (counter > 1) setCounter((prev) => prev - 1);
  }

  return (
    <div className="flex items-center gap-2">
      <div className="shadow-md bg-secondary w-full rounded-sm p-2 flex justify-between items-center gap-2 my-2">
        <button onClick={minusCounter} type="button">
          <Minus />
        </button>
        {counter}
        <button onClick={addCounter} type="button">
          <Plus />
        </button>
      </div>
      <Button onClick={handleRequest} className="w-full">
        Pedir
      </Button>
    </div>
  );
}
