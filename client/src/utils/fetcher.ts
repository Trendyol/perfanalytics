import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    return Promise.reject(error.response.data);
  }
);

export const fetcher = (url: any) =>
  axiosInstance.get(url).then((res) => res.data);
