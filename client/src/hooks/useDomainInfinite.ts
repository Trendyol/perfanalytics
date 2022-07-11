import useSWRInfinite from "swr/infinite";
import { flattenNestedProperty } from "@utils/common";
import { fetcher } from "@utils/fetcher";
import { getDomainKey } from "@utils/swr";
import { Domain, DomainData } from "@interfaces";

const useDomainInfinite = () => {
  const { data, error, size, setSize, mutate } = useSWRInfinite<DomainData>(getDomainKey, fetcher, {
    revalidateFirstPage: false,
    revalidateAll: false,
    revalidateOnFocus: false,
    revalidateIfStale: false,
    initialSize: 1,
    persistSize: true,
  });

  const flattenDomains = flattenNestedProperty("docs", data);

  const removeDomainInfinite = async (domainId: string) => {
    return mutate(
      (prev) =>
        prev?.map((domainData: DomainData) => {
          domainData.docs = domainData.docs.filter((domainData) => domainData._id !== domainId);
          return domainData;
        }),
      false
    );
  };

  const addDomainInfinite = async (newDomain: Partial<Domain>) => {
    return mutate([{ docs: [newDomain, ...flattenDomains], totalDocs: length + 1 }], false);
  };

  const updateDomainInfinite = async (domainId: string, values: Partial<Domain>) => {
    return mutate(
      (prevDomainData) =>
        prevDomainData?.map((domainData: DomainData) => {
          domainData.docs = domainData.docs.map((domain) => {
            if (domain._id === domainId) {
              return { ...domain, ...values };
            }
            return domain;
          });
          return domainData;
        }),
      false
    );
  };

  return {
    size,
    setSize,
    removeDomainInfinite,
    addDomainInfinite,
    updateDomainInfinite,
    length: data?.[0]?.totalDocs || 0,
    isLoading: !error && !data,
    isError: error?.statusText,
    domains: flattenDomains,
    mutateDomains: mutate,
  };
};

export default useDomainInfinite;
