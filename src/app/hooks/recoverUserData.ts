import { useQuery } from "@tanstack/react-query";
import { recover } from "../services/user";


export function recoverUserData(ctx?: any) {
  const { data, isFetching } = useQuery({
    queryFn: () => recover(),
    queryKey: ["user"],
    initialData: null,
    retry: 2,
  });

  return {
    data, isFetching
  };
}
