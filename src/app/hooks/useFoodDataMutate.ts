import axios, { AxiosPromise } from "axios"
import { FoodData } from "../interface/FoodData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080'

const postData = async(data: FoodData) => {
    const response = axios.post(API_URL + '/food', data);
    return response;
}

export function useFoodDataMutate(){
    const queryClient = useQueryClient();
    const query = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['food-data']});
        }
    });

    return {
        ...query, 
        data: query.data?.data
    }
}