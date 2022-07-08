import useSWRInfinite from "swr/infinite";
import { flattenNestedProperty } from "@utils/common";
import { fetcher } from "@utils/fetcher";
import { getDomainKey } from "@utils/swr";
import { DomainData } from "src/interfaces";

const useDomainInfinite = () => {
  const { data, error, size, setSize, mutate } = useSWRInfinite<DomainData>(
    getDomainKey,
    fetcher,
    {
      revalidateFirstPage: false,
      revalidateAll: false,
      revalidateOnFocus: false,
      revalidateIfStale: false,
      initialSize: 1,
      persistSize: true,
    }
  );

  return {
    size,
    setSize,
    length: data?.[0]?.totalDocs || 0,
    isLoading: !error && !data,
    isError: error?.statusText,
    domains: flattenNestedProperty("docs", data),
    mutateDomains: mutate,
  };
};

export default useDomainInfinite;
