import { findAllType } from "@/app/services/types";
import { useQuery } from "@tanstack/react-query";

export function useTypeData(ctx?: any) {
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
