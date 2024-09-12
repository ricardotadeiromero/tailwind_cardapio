import { ChangeStatusOrderDTO } from "@/app/dto/ChangeStatusOrderDTO";
import { CreateOrderDTO } from "@/app/dto/CreateOrderDTO";
import { Order } from "@/app/interface/Order";
import { api } from "@/app/services/api";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function changeStatus(dto: ChangeStatusOrderDTO): Promise<Order> {
  const { data } = await api.put("/order/change-status/" + dto.id, dto);
  return data;
}

export function chanageStatusOrder(ctz?: any) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: changeStatus,
    retry: 2,
    onSuccess: () => {
      toast({
        description: "Pedido atualizado com sucesso!",
      });
      queryClient.invalidateQueries({ queryKey: ["order-data"] });
    },
    onError: () => {
      toast({
        title: "Ups! Parece que algo deu errado...",
        description: "Ocorreu algum erro com a requisição!",
        variant: "destructive",
      });
    },
  });

  return query;
}
