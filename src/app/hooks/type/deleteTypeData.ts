import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { deleteType } from "@/app/services/types";

export function deleteTypeData(ctx?: any) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const query = useMutation({
    mutationFn: deleteType,
    retry: 2,
    onSuccess: () => {
      toast({
        description: "Item excluído com sucesso!",
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
