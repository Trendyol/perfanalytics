import { Page } from "@interfaces";
import { fetcher } from "@utils/fetcher";
import { getPageKey } from "@utils/swr";
import useSWR from "swr";

const usePages = (domainId: string, tagId?: string) => {
  const key = getPageKey(domainId, tagId);
  const { data, error, mutate } = useSWR<Page[]>(key, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });

  const mappedData = data?.map((x) => {
    const urlObject = new URL(x.url);
    return { ...x, pathname: urlObject.pathname };
  });

  return {
    pages: mappedData,
    isLoading: !error && !data,
    isError: error?.message,
    mutatePages: mutate,
  };
};

export default usePages;
