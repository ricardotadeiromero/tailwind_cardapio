import { Order } from "@/app/interface/Order";
import { api } from "@/app/services/api";
import { useQuery } from "@tanstack/react-query";

async function findOrdersByClient(clientId: string): Promise<Order[]> {
    const {data} = await api.get(`/order/${clientId}`);
    return data;
}

export function useOrderByClient(clientId: string, ctx?: any) {
    const {data, isFetching} = useQuery({
        queryFn: () => findOrdersByClient(clientId),
        queryKey: ["order-data", clientId],
        initialData: [],
        retry: 2,
        refetchInterval: 5000
    })

    return {
        data,
        isFetching
    }
}