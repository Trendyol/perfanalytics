import { fetcher } from "@utils/fetcher";
import { TagResponse } from "src/interfaces";
import useSWR from "swr";

const useTags = (domainId: string, index: number = 0) => {
  const { data, error, mutate } = useSWR(`/tag?domainId=${domainId}&index=${index}`, fetcher);

  return {
    tags: data?.docs.map((tag: TagResponse) => ({ id: tag._id, name: tag.name, color: tag.color })).reverse(),
    isLoading: !error && !data,
    isError: error?.message,
    mutateTag: mutate
  };
};

export default useTags;
