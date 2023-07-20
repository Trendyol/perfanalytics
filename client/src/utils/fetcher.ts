import axios, { AxiosRequestConfig } from "axios";
import { getConfigWithTypes } from "@contexts/ConfigContext";

const configs = getConfigWithTypes();

axios.defaults.baseURL = configs.baseUrl;
axios.defaults.withCredentials = true;

export const fetcher = async (url: any, config?: AxiosRequestConfig) => {
  const res = await axios.get(url, config);
  return res.data;
};
