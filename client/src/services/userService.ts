import { axiosInstance } from "@utils/fetcher";

export const createSession = () => {
  return axiosInstance.post("/session", {
    email: "ddenizakpinar2@gmail.com",
    password: "12345678",
  });
};

export const deleteSession = () => {
  return axiosInstance.delete("/session");
};
