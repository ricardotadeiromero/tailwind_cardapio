import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteFood, findAll } from "../services/food";
import { useToast } from "@/components/ui/use-toast";

export function deleteFoodData(ctx?: any) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const query = useMutation({
    mutationFn: deleteFood,
    retry: 2,
    onSuccess: () => {
      toast({
        description: "Item excluído com sucesso!",
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
