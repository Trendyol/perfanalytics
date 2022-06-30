import { fetcher } from "@utils/fetcher";
import useSWR from "swr";

export const USER_KEY = "/user/@me";

interface User {
  name?: string;
  email?: string;
}

export const useUser = (shouldCallApi?: boolean) => {
  const { data, error } = useSWR<User>(
    shouldCallApi ? USER_KEY : null,
    fetcher
  );
  return {
    data,
    isLoading: !error && !data,
    isError: error?.statusText,
  };
};
