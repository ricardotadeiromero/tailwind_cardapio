import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Order, Status } from "../../../interface/Order";
import { Button } from "@/components/ui/button";
import { ResponsiveDialog } from "../../components/responsive-dialog";
import OrderDetails from "./OrderDetails";

interface CardOrderProps {
  order: Order;
  index: number;
}

export default function CardOrder({ order, index }: CardOrderProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
      <ResponsiveDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Detalhes do pedido"
        description=""
      >
        <OrderDetails setIsOpen={setIsOpen} order={order} />
      </ResponsiveDialog>
      <Card className="w-[250px]">
        <CardHeader>
          <CardTitle>#Pedido {index + 1}</CardTitle>
          <CardDescription>
            <p>Cliente: {order.client?.username}</p>
            <p>
              Status: <span className={statusColor()}>{order.status}</span>
            </p>
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button
            className="w-full"
            onClick={() => setIsOpen(true)}
            variant={"default"}
          >
            Ver pedido
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
