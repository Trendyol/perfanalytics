import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

export const fetcher = (url: any) => axiosInstance.get(url).then((res) => res.data);

