import { axiosInstance } from "@utils/fetcher";

interface CreateDomain {
  name: string;
  url: string;
}

export const createDomain = ({ name, url }: CreateDomain) => {
  return axiosInstance.post("/domain", {
    name: name,
    url: url,
  });
};
