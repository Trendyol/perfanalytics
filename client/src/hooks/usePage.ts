import { fetcher } from "@utils/fetcher";
import { Page } from "src/interfaces";
import useSWR from "swr";

const usePage = (id: string) => {
  const { data, error, mutate } = useSWR<Page>(`/page/${id}`, fetcher, {
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
