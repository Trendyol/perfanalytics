import { mapReportsData } from "@utils/common";
import { fetcher } from "@utils/fetcher";
import { getReportKey } from "@utils/swr";
import { ReportData } from "src/interfaces";
import useSWRInfinite from "swr/infinite";

const useReportsInfinite = (pageId: string, initialDate: Date, periodAsDay: number) => {
  const { data, error, size, setSize, mutate } = useSWRInfinite<ReportData>((_, prev) => getReportKey(pageId, initialDate, periodAsDay, prev), fetcher, {
    revalidateFirstPage: false,
    revalidateAll: false,
    revalidateOnFocus: false,
    revalidateIfStale: false,
    initialSize: 1,
    persistSize: true,
  });

  if (!data || error) {
    return {
      length: 0,
      isError: true,
      reports: null,
    }
  }

  const mappedReportsData = mapReportsData(data[0])

  return {
    size,
    setSize,
    length: data?.length || 0,
    isLoading: !error && !data,
    isError: error?.statusText,
    reports: mappedReportsData,
    mutateReports: mutate,
  };
};

export default useReportsInfinite;
