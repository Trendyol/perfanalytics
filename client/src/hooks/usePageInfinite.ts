import useSWRInfinite from "swr/infinite";
import { flattenNestedProperty } from "@utils/common";
import { fetcher } from "@utils/fetcher";
import { getPageKey } from "@utils/swr";

const usePageInfinite = (domainId: string, tagId: string) => {
  const { data, error, size, setSize, mutate } = useSWRInfinite<any>((index, prev) => getPageKey(domainId, tagId, index, prev), fetcher, {
    revalidateFirstPage: false,
    revalidateAll: false,
    revalidateOnFocus: false,
    revalidateIfStale: false,
    initialSize: 1,
    persistSize: true,
  });

  return {
    size,
    setSize,
    length: data?.[0]?.totalDocs || 0,
    isLoading: !error && !data,
    isError: error?.statusText,
    pages: flattenNestedProperty("docs", data),
    mutatePages: mutate,
  };
};

export default usePageInfinite;
