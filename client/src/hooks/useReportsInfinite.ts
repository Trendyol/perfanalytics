import { mapReportsData } from "@utils/common";
import { fetcher } from "@utils/fetcher";
import { getReportKey } from "@utils/swr";
import { ReportData } from "src/interfaces";
import useSWR from "swr";

const useReports = ({ pageId, startDate, endDate }: Params) => {
  const { data, error, mutate } = useSWR<ReportData[]>(getReportKey(pageId, startDate, endDate), fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });

  if (!data || error) {
    return {
      length: 0,
      isError: true,
      reports: null,
    };
  }

  const mappedReportsData = mapReportsData(data);

  return {
    length: data?.length || 0,
    isLoading: !error && !data,
    isError: error?.statusText,
    reports: mappedReportsData,
    mutateReports: mutate,
  };
};

interface Params {
  pageId: string;
  startDate: number;
  endDate: number;
}

export default useReports;
