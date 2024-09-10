import { CreateOrderDTO } from "@/app/dto/CreateOrderDTO";
import { Order } from "@/app/interface/Order";
import { api } from "@/app/services/api";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function postData(order: CreateOrderDTO): Promise<Order> {
  const { data } = await api.post("/order", order)
  return data;
}

export function useOrderDataMutate(ctz?: any) {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const query = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            toast({
                description: "Pedido realizado com sucesso!"
            });
            queryClient.invalidateQueries({ queryKey: ["order-data"]});
        },
        onError: () => {
            toast({
                title: "Ups! Parece que algo deu errado...",
                description: "Ocorreu algum erro com a requisição!",
                variant: "destructive",
              });
        }
    });

    return query;
}
