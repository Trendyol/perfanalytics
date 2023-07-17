import { fetcher } from "@utils/fetcher";
import useSWR from "swr";

const useDashboardCount = (id?: string) => {
  const { data, error, mutate } = useSWR("/dashboard" + (id ? `/?domainId=${id}` : ""), fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });

  const dashboardCounts: Record<string, number> = {};

  if (data) {
    if (data.domainCount) {
      dashboardCounts.domainCount = data?.domainCount;
    }

    if (data.pageCount) {
      dashboardCounts.pageCount = data?.pageCount;
    }

    if (data.reportCount) {
      dashboardCounts.reportCount = data?.reportCount;
    }
  }

  return {
    dashboardCounts: dashboardCounts,
    isLoading: !error && !data,
    isError: error?.message,
    mutateDashboardCount: mutate,
  };
};

export default useDashboardCount;
