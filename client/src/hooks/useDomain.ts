import { flattenNestedProperty } from "@utils/common";
import { fetcher } from "@utils/fetcher";
import useSWRInfinite from "swr/infinite";

interface DomainData {
  docs: Domain[];
  totalDocs: number;
}

interface Domain {
  name?: string;
  email?: string;
}

const getDomainKey = (pageIndex: number, previousPageData: any) => {
  if (previousPageData && !previousPageData?.hasNextPage) return null;
  return `/page?index=${pageIndex}`;
};

export const useDomainInfinite = () => {
  const { data, error, size, setSize, mutate } = useSWRInfinite<DomainData>(
    getDomainKey,
    fetcher,
    {
      revalidateFirstPage: false,
      revalidateAll: false,
      initialSize: 1,
      persistSize: true,
    }
  );

  return {
    data: flattenNestedProperty("docs", data),
    length: data?.[0]?.totalDocs || 0,
    isLoading: !error && !data,
    isError: error?.statusText,
    size,
    setSize,
    mutate,
  };
};
