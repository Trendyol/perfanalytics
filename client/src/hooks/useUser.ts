import { fetcher } from "@utils/fetcher";
import useSWR from "swr";

export const USER_KEY = "/user/@me";

export const useUser = (shouldCallApi?: boolean) => {
  const { data, error, mutate } = useSWR(
    shouldCallApi ? USER_KEY : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );

  return {
    data,
    mutate,
    isLoading: !error && !data,
    isError: error?.statusText,
  };
};
