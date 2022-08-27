import { fetcher } from "@utils/fetcher";
import { DashboardMetrics } from "src/interfaces";
import useSWR from "swr";

const useDashboardMetric = (id?: string) => {
  const { data, error, mutate } = useSWR<DashboardMetrics>("/dashboard" + (id ? `/?domainId=${id}` : ""), fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });

  return {
    dashboardMetrics: data,
    isLoading: !error && !data,
    isError: error?.message,
    mutateDashboardMetrics: mutate,
  };
};

export default useDashboardMetric;
