import { useQuery } from "@tanstack/react-query";
import { findAll, findFood } from "../services/food";


export function getFoodData(id: string,ctx?:any) {
  const { data, isFetching } = useQuery({
    queryFn: () => findFood(id),
    queryKey: ["food-data"],
    retry: 2,
  });

  return {
    data,
    isFetching,
  };
}
