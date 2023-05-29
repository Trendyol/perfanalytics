import { axiosInstance } from "@utils/fetcher";

interface CreateDomain {
  name: string;
  url: string;
}
interface UpdateDomain {
  name: string; 
  url: string;
}

export const createDomain = ({ name, url }: CreateDomain) => {
  return axiosInstance.post("/domain", {
    name: name,
    url: url,
  });
};

export const updateDomain = (id: string, { name, url }: UpdateDomain) => {
  return axiosInstance.put(`/domain/${id}`, {
    name: name,
    url: url,
  }); 
};

export const deleteDomain = (id: string) => {
  return axiosInstance.delete(`/domain/${id}`);
};
