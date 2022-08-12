import { fetcher } from "@utils/fetcher";
import { TagResponse } from "src/interfaces";
import useSWR from "swr";

const useTags = (index: number = 0) => {
  const { data, error, mutate } = useSWR(`/tag?index=${index}`, fetcher);

  return {
    tags: data?.docs.map((tag: TagResponse) => ({ id: tag._id, name: tag.name, color: tag.color })).reverse(),
    isLoading: !error && !data,
    isError: error?.message,
  };
};

export default useTags;
