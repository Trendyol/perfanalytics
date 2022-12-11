import { FilterTimeRange } from "@enums";
import { getStartDate } from "@utils/common";
import { fetcher } from "@utils/fetcher";
import { Path } from "src/interfaces";
import useSWR from "swr";

const useLighthouseMetricAverages = (pathId: string | string[] | undefined, initialDate: Date, period: FilterTimeRange) => {
  const { startDate, endDate } = getStartDate(initialDate, Number(period));
  const { data, error, mutate } = useSWR<[Path]>(`/lighthouse/analytics/${pathId}?startDate=${startDate}&endDate=${endDate}`, fetcher);

  return {
    lighthouseMetricAverages: data ? data[0] : null,
    isLoading: !error && !data,
    isError: error?.message,
    mutatePage: mutate,
  };
};

export default useLighthouseMetricAverages;
