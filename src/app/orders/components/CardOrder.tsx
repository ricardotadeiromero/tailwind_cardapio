import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Order, Status } from "@/app/interface/Order";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { User } from "@/app/interface/User";
import OrderDialog from "./OrderDialog";

interface CardOrderProps {
  order: Order;
  user: User;

}

export default function CardOrder({ order, user }: CardOrderProps) {
  function statusText() {
    switch (order.status) {
      case Status.ACTIVE:
        return "Seu pedido já foi enviado! Logo será preparado";
      case Status.ONGOING:
        return "Seu pedido já está sendo preparado!";
      case Status.DONE:
        return "Seu pedido foi finalizado!";
    }
  }
  function statusColor() {
    switch (order.status) {
      case Status.ACTIVE:
        return "text-green-400";
      case Status.ONGOING:
        return "text-yellow-600";
      case Status.DONE:
        return "text-red-500";
      default:
        return "";
    }
  }
  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>#Pedido</CardTitle>
          <CardDescription>
            <p>
              Status: <span className={statusColor()}>{statusText()}</span>
            </p>
            <Separator />
          </CardDescription>
          <CardContent className="px-0">
            <>
              {order.items.map((item) => (
                <div key={item.id}>
                  <span className="text-sm font-light">{item.amount}x</span>{" "}
                  {item.food.title}
                </div>
              ))}
            </>
          </CardContent>
        </CardHeader>
        <CardFooter>
          <OrderDialog order={order} client={user}/>
        </CardFooter>
      </Card>
    </>
  );
}
