import { axiosInstance } from "@utils/fetcher";

export const createReport = (pageId: string) => {
  return axiosInstance.get(`/report/run/${pageId}`);
};
