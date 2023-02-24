import { fetcher } from "@utils/fetcher";
import { Report } from "src/interfaces";
import useSWR from "swr";

const useWebhookToken = (pageId: string) => {
  const { data, error } = useSWR<Report>(`/report/token/generate?pageId=${[pageId]}`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });

  return {
    webhookToken: data,
    isLoading: !error && !data,
    isError: error?.message,
  };
};

export default useWebhookToken;
