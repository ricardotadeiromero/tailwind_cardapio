import React, { useContext } from "react";
import { FoodData } from "../interface/FoodData";
import { Separator } from "@/components/ui/separator";
import { FoodContext } from "../contexts/FoodContext";
import { OrderItem } from "../interface/OrderItem";
import CurrencyFormatter from "./CurrencyFormatter";

interface RequestItemProps {
  req: OrderItem;
}

export default function RequestItem({ req }: RequestItemProps) {
  const { removeRequest } = useContext(FoodContext);
  const food = req.food;
  function handleRemove() {
    removeRequest(req.id!);
  }
  return (
    <>
      <div className="mx-auto flex justify-between py-4">
        <div className="flex flex-col gap-2">
          <p className="flex items-center gap-1">
            <span className="text-sm font-light">{req.amount}x</span>
            {food.title}
          </p>
          <button
            onClick={handleRemove}
            className="text-left text-primary text-sm font-light"
            type="button"
          >
            Remover
          </button>
        </div>
        <div>
          <CurrencyFormatter value={food.price * req.amount} />
        </div>
      </div>
      <Separator />
    </>
  );
}
