import { useQuery } from "@tanstack/react-query";
import { findAll, findAllGrouped } from "../services/food";
import { FoodData } from "../interface/FoodData";


export function useFoodDataGrouped(ctx?: any) {
  const { data, isFetching } = useQuery({
    queryFn: () => findAllGrouped(),
    queryKey: ["food-data"],
    retry: 2,
  });

  return {
    data, isFetching
  };
}
