import { axiosInstance } from "@utils/fetcher";

interface CreatePage {
  url: string;
  device: string;
  domainId: string;
}

export const createPage = ({ domainId, url, device }: CreatePage) => {
  return axiosInstance.post("/page", {
    domainId: domainId,
    url: url,
    device: device
  });
};
