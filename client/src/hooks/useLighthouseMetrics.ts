import { getStartDate } from "@utils/common";
import { fetcher } from "@utils/fetcher";
import { Path } from "src/interfaces";
import useSWR from "swr";

const useLighthouseMetrics = (pathId: string, initialDate: Date, periodAsDay: number) => {
  const { startDate, endDate } = getStartDate(initialDate, periodAsDay);
  const { data, error, mutate } = useSWR<[Path]>(`/lighthouse/analytics/${pathId}?startDate=${startDate}&endDate=${endDate}`, fetcher);

  return {
    analytics: data ? data[0] : null,
    isLoading: !error && !data,
    isError: error?.message,
    mutatePage: mutate,
  };
};

export default useLighthouseMetrics;
