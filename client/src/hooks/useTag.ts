import { fetcher } from "@utils/fetcher";
import { TagResponse } from "src/interfaces";
import useSWR from "swr";

const useTags = (domainId: string, index: number = 0) => {
  const { data, error, mutate } = useSWR(domainId ? `/tag?domainId=${domainId}` : null, fetcher, {
    revalidateOnFocus: false,
  });
  return {
    tags: data
      ?.map((tag: TagResponse) => ({
        id: tag._id,
        name: tag.name,
        color: tag.color,
        readonly: tag.readonly,
      }))
      .reverse(),
    isLoading: !error && !data,
    isError: error?.message,
    mutateTag: mutate,
  };
};

export default useTags;
