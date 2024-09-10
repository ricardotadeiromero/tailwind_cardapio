import { Order } from "@/app/interface/Order";
import { api } from "@/app/services/api";
import { useQuery } from "@tanstack/react-query";

async function findActiveOrders(): Promise<Order[]> {
    const {data} = await api.get("/order/active");
    return data;
}

export function useOrderData(ctx?: any) {
    const {data, isFetching} = useQuery({
        queryFn: () => findActiveOrders(),
        queryKey: ["order-data"],
        initialData: [],
        retry: 2,
        refetchInterval: 5000
    })

    return {
        data,
        isFetching
    }
}