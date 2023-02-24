import { mapReportsData } from "@utils/common";
import { fetcher } from "@utils/fetcher";
import { getReportKey } from "@utils/swr";
import { differenceInMilliseconds } from "date-fns";
import { Report, ReportData } from "src/interfaces";
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

  const mappedReportsData: Array<Report> = mapReportsData(data);
  const sortedReportsData: Array<Report> = mappedReportsData.sort((prevPeport: Report, currReport: Report) =>
    differenceInMilliseconds(new Date(currReport.createdAt), new Date(prevPeport.createdAt))
  );

  return {
    length: mappedReportsData?.length || 0,
    isLoading: !error && !data,
    isError: error?.statusText,
    reports: sortedReportsData,
    mutateReports: mutate,
  };
};

interface Params {
  pageId: string;
  startDate: number;
  endDate: number;
}

export default useReports;
