import React, { useContext } from "react";
import CardOrder from "./CardOrder";
import { useOrderByClient } from "@/app/hooks/order/useOrderByClient";
import { AuthContext } from "@/app/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Status } from "@/app/interface/Order";

export default function OrderSection() {
  const { user } = useContext(AuthContext);

  // Só busca os pedidos se o `user` estiver disponível
  const { data } = useOrderByClient(user?.id!);
  const activeOrders = data.filter(
    (order) => order.status == Status.ACTIVE || order.status == Status.ONGOING
  );
  const doneOrders = data.filter((order) => order.status == Status.DONE);
  // Verifica se o user ainda não foi carregado
  if (!user) {
    return <div>Loading user...</div>;
  }

  return (
    <Tabs defaultValue="active">
      <TabsList className="grid w-full  grid-cols-2 mx-auto">
        <TabsTrigger value="active">Ativos</TabsTrigger>
        <TabsTrigger value="done">Concluídos</TabsTrigger>
      </TabsList>
      <TabsContent
        className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4"
        value="active"
      >
        <>
          {activeOrders?.map((order, index) => (
            <CardOrder key={index} user={user} order={order} />
          ))}
        </>
      </TabsContent>
      <TabsContent
        className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4"
        value="done"
      >
        {doneOrders?.map((order, index) => (
          <CardOrder key={index} user={user} order={order} />
        ))}
      </TabsContent>
    </Tabs>
  );
}
