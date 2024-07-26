import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFood } from "../services/food";
import { useToast } from "@/components/ui/use-toast";

export function updateFoodData(ctx?: any) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const query = useMutation({
    mutationFn: updateFood,
    retry: 2,
    onSuccess: () => {
      toast({
        description: "Item atualizado com sucesso!",
      }),
        queryClient.invalidateQueries({ queryKey: ["food-data"] });
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
