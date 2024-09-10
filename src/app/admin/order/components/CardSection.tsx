"use client";
import { useOrderData } from "@/app/hooks/order/useOrderData";
import React from "react";
import CardOrder from "./CardOrder";

export default function CardSection() {
  const { data } = useOrderData();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data.map((order, index) => (
        <CardOrder order={order} index={index} />
      ))}
    </div>
  );
}
