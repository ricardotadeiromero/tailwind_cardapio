import { Order } from "@/app/interface/Order";
import { Badge } from "@/components/ui/badge";
import React from "react";
import FormOrder from "./FormOrder";

interface OrderDetailsProps {
  order: Order;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function OrderDetails({ order, setIsOpen }: OrderDetailsProps) {
  return (
    <>
      <p>
        Cliente: <Badge>{order.client.username}</Badge>
      </p>
      <p>
        Status: <Badge variant={order.status}>{order.status}</Badge>
      </p>
      <div>
        <h3 className="text-xl font-bold">Itens:</h3>
        {order.items.map((item) => (
          <div key={item.id}>
            <span className="text-sm font-light">{item.amount}x</span>{" "}
            {item.food.title}
          </div>
        ))}
      </div>
      <FormOrder order={order} setIsOpen={setIsOpen}/>
    </>
  );
}
