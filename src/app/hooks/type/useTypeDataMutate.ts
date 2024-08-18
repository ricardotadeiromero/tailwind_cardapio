
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast";
import { createType } from "@/app/services/types";

export function useTypeDataMutate(ctx?: any){
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const query = useMutation({
        mutationFn: createType,
        retry: 2,
        onSuccess: () => {
            toast({
                description: 'Item adicionado com sucesso!'
            })
            queryClient.invalidateQueries({queryKey: ['food-type']});
        },
        onError: () => {
            toast({
                title: 'Ups! Parece que algo deu errado...',
                description: 'Ocorreu algum erro com a requisição!',
                variant: 'destructive'
            })
        }
    });

    return {
        ...query, 
        data: query.data?.data
    }
}