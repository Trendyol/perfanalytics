import { fetcher } from "@utils/fetcher";
import { DashboardMetrics } from "src/interfaces";
import useSWR from "swr";

const useDasboardMetric = (id: string) => {
    const { data, error, mutate } = useSWR<DashboardMetrics>(`/dashboard${id !== '' ? `/?=${id}` : ''}`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
    });

    return {
        dashboardMetrics: data,
        isLoading: !error && !data,
        isError: error?.message,
        mutateDomain: mutate,
    };
};

export default useDasboardMetric;
