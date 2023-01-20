import { fetcher } from "@utils/fetcher";
import { Domain } from "src/interfaces";
import useSWR from "swr";

const useDomains = () => {
  const { data, error, mutate } = useSWR<Domain[]>(`/domain`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });

  return {
    domains: data,
    isLoading: !error && !data,
    isError: error?.message,
    mutateDomains: mutate,
  };
};

export default useDomains;
