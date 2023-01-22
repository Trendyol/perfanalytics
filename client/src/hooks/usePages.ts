import { fetcher } from "@utils/fetcher";
import { getPageKey } from "@utils/swr";
import { Page } from "@interfaces";
import useSWR from "swr";

const usePages = (domainId: string, tagId?: string) => {
  const key = getPageKey(domainId, tagId);
  const { data, error, mutate } = useSWR<Page[]>(key, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });

  return {
    pages: data,
    isLoading: !error && !data,
    isError: error?.message,
    mutatePages: mutate,
  };
};

export default usePages;
