import { fetcher } from "@utils/fetcher";
import { TagResponse } from "src/interfaces";
import useSWR from "swr";

const useTags = (domainId: string, index: number = 0) => {
  const { data, error, mutate } = useSWR(domainId ? `/tag?domainId=${domainId}` : null, fetcher, {
    revalidateOnFocus: false,
  });

  const safeData = data ?? [];

  return {
    tags: safeData.map((tag: TagResponse) => ({
      id: tag._id,
      name: tag.name,
      color: tag.color,
      readonly: tag.readonly,
    })),
    isLoading: !error && !data,
    isError: error?.message,
    mutateTag: mutate,
  };
};

export default useTags;
