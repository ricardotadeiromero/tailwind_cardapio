import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Order } from "@/app/interface/Order";
import { useOrderDataMutate } from "@/app/hooks/order/useOrderDataMutate";
import { User } from "@/app/interface/User";
import { Button } from "@/components/ui/button";

interface OrderDialogProps {
  order: Order;
  client: User;
}

export default function OrderDialog({ order, client }: OrderDialogProps) {
  const orderItems = order.items.map((item) => ({
    foodId: item.food.id!,
    amount: item.amount,
  }));
  const { mutate } = useOrderDataMutate();
  function handleClick() {
    mutate({ client: client.id!, items: orderItems });
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant={"secondary"}>Refazer pedido</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza que deseja refazer o pedido?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Ao clicar em pedir, o pedido descrito será enviado para ser
            preparado.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleClick}>Pedir</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
