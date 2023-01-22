import { fetcher } from "@utils/fetcher";
import { DashboardMetrics } from "src/interfaces";
import useSWR from "swr";

const useDashboardCount = (id?: string) => {
  const { data, error, mutate } = useSWR<DashboardMetrics>("/dashboard" + (id ? `/?domainId=${id}` : ""), fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });

  return {
    dashboardCounts: data,
    isLoading: !error && !data,
    isError: error?.message,
    mutateDashboardCount: mutate,
  };
};

export default useDashboardCount;
