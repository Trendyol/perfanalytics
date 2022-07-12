import { fetcher } from "@utils/fetcher";
import useSWR from "swr";

export const USER_KEY = "/user/@me";

interface User {
  name?: string;
  email?: string;
}

export const useUser = () => {
  const { data, error, mutate } = useSWR<User>(USER_KEY, fetcher);

  return {
    user: data,
    mutateUser: mutate,
    isLoading: !error && !data,
    isError: error?.statusText,
  };
};
