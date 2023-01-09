import { fetcher } from "@utils/fetcher";
import { MetricAveragesResponse } from "src/interfaces";
import useSWR from "swr";

const useMetricAverages = ({ pathId, startDate, endDate }: Params) => {
  const metricAveragesUrl = `/lighthouse/analytics/${pathId}?startDate=${new Date(startDate).toISOString()}&endDate=${new Date(endDate).toISOString()}`;

  const { data, error, mutate } = useSWR<Array<MetricAveragesResponse>>(metricAveragesUrl, fetcher);

  return {
    metricAverages: data ? data[0] : null,
    isLoading: !error && !data,
    isError: error?.message,
    mutatePage: mutate,
  };
};

interface Params {
  pathId: string;
  startDate: number;
  endDate: number;
}

export default useMetricAverages;
