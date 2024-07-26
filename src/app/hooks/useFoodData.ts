import { useQuery } from "@tanstack/react-query";
import { findAll } from "../services/food";


export function useFoodData(ctx?: any) {
  const { data, isFetching } = useQuery({
    queryFn: () => findAll(),
    queryKey: ["food-data"],
    initialData: [],
    retry: 2,
  });

  return {
    data, isFetching
  };
}
