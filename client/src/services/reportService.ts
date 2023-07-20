import axios from "axios";

export const createReport = (pageId: string) => {
  return axios.get(`/report/run/${pageId}`);
};
