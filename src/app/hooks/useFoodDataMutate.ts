import axios, { AxiosPromise } from "axios"
import { FoodData } from "../interface/FoodData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";
import { useToast } from "@/components/ui/use-toast";

const postData = async(data: FoodData) => {
    const response = api.post('/food', data);
    return response;
}

export function useFoodDataMutate(ctx?: any){
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const query = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            toast({
                description: 'Item adicionado com sucesso!'
            })
            queryClient.invalidateQueries({queryKey: ['food-data']});
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