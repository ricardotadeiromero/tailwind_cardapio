import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast";
import { updateType } from "@/app/services/types";

export function updateTypeData(ctx?: any) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const query = useMutation({
    mutationFn: updateType,
    retry: 2,
    onSuccess: () => {
      toast({
        description: "Item atualizado com sucesso!",
      }),
        queryClient.invalidateQueries({ queryKey: ["food-type"] });
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
