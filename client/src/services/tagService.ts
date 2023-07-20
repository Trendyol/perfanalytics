import { Tag } from "@interfaces";
import axios from "axios";

export const createTag = ({ name, color, domainId, readonly }: Partial<Tag>) => {
  return axios.post("/tag", { name, color, domainId, readonly });
};

export const deleteTag = (id: string) => {
  return axios.delete(`/tag/${id}`);
};

export const updateTag = ({ id, name, color }: Partial<Tag>) => {
  return axios.put(`/tag/${id}`, { name, color });
};
