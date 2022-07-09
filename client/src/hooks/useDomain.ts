import { fetcher } from "@utils/fetcher";
import { Domain } from "src/interfaces";
import useSWR from "swr";

const useDomain = (id: string) => {
  const { data, error, mutate } = useSWR<Domain>(`/domain/${id}`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });

  return {
    domain: data,
    isLoading: !error && !data,
    isError: error?.message,
    mutateDomain: mutate,
  };
};

export default useDomain;
