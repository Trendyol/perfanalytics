import { fetcher } from "@utils/fetcher";
import { Report } from "src/interfaces";
import useSWR from "swr";

const useReport = (id: string) => {
  const { data, error, mutate } = useSWR<Report>(`/report/${id}`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });

  return {
    report: data,
    isLoading: !error && !data,
    isError: error?.message,
    mutateReport: mutate,
  };
};

export default useReport;
