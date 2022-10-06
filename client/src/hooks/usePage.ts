import { fetcher } from "@utils/fetcher";
import { Path } from "src/interfaces";
import useSWR from "swr";

const usePage = (id: string) => {
  const { data, error, mutate } = useSWR<Path>(`/page/${id}`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });

  return {
    page: data,
    isLoading: !error && !data,
    isError: error?.message,
    mutatePage: mutate,
  };
};

export default usePage;
