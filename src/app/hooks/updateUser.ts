import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast";
import { updateUser } from "../services/user";

export function updateUserData(ctx?: any) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const query = useMutation({
    mutationFn: updateUser,
    retry: 2,
    onSuccess: () => {
      toast({
        description: "Item atualizado com sucesso!",
      }),
        queryClient.invalidateQueries({ queryKey: ["user"] });
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
