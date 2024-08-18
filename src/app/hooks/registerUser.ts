import axios, { AxiosPromise } from "axios";
import { FoodData } from "../interface/FoodData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";
import { useToast } from "@/components/ui/use-toast";
import { User } from "../interface/User";

const postData = async (user: FormData) => {
  const { data } = await api.post("/auth/register", user, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export function registerUser(ctx?: any) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const query = useMutation({
    mutationFn: postData,
    onSuccess: () => {
      toast({
        description: "Usuário criado com sucesso!",
      });
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

  return {
    ...query,
    data: query.data,
  };
}
