import { Tag } from "@interfaces";
import { axiosInstance } from "@utils/fetcher";

export const createTag = ({ name, color }: Partial<Tag>) => {
  return axiosInstance.post("/tag", { name, color });
};

export const deleteTag = (id: string) => {
  return axiosInstance.delete(`/tag/${id}`);
};

export const editTag = ({ id, name, color }: Tag) => {
  return axiosInstance.put(`/tag/${id}`, { name, color });
};
