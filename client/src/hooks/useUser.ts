import { USER_KEY } from "@constants";
import { HttpCodes } from "@enums";
import { fetcher } from "@utils/fetcher";
import useSWR from "swr";

interface User {
  name?: string;
  email?: string;
}

const useUser = () => {
  const { data, error, mutate } = useSWR<User | null>(USER_KEY, fetcher, {
    onError: (err) => {
      if (err?.statusCode === HttpCodes.UNAUTHORIZED) {
        mutate(null, false);
      }
    },
  });

  return {
    user: data,
    mutateUser: mutate,
    isLoading: !error && !data,
    isError: error?.statusText,
  };
};

export default useUser;
