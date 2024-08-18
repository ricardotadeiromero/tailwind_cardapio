import { useQuery } from "@tanstack/react-query";
import { findAllType } from "../services/types";

export function useFoodType(ctx?: any) {
  const { data, isFetching } = useQuery({
    queryFn: () => findAllType(),
    queryKey: ["food-types"],
    initialData: [],
    retry: 2,
  });

  return {
    data,
    isFetching,
  };
}
