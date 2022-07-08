import { fetcher } from "@utils/fetcher";
import { Domain } from "src/interfaces";
import useSWR from "swr";

const useDomain = (name: string) => {
  const { data, error, mutate } = useSWR<Domain>(`/domain/${name}`, fetcher, {
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
