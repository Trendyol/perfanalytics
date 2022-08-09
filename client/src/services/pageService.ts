import { axiosInstance } from "@utils/fetcher";

interface CreatePage {
  url: string;
  device: string;
  domainId: string;
}

interface UpdatePage {
  url: string;
  device: string;
}

export const createPage = ({ domainId, url, device }: CreatePage) => {
  return axiosInstance.post("/page", {
    domainId: domainId,
    url: url,
    device: device
  });
};

export const updatePage = (id: string, { url, device }: UpdatePage) => {
  return axiosInstance.put(`/page/${id}`, {
    url: url,
    device: device
  }); 
};

export const deletePage = (id: string) => {
  return axiosInstance.delete(`/page/${id}`);
};
