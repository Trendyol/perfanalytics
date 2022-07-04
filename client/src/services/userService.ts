import { axiosInstance } from "@utils/fetcher";

interface CreateSession {
  email: string;
  password: string;
}

interface CreateUser {
  name: string;
  email: string;
  password: string;
}

interface UpdateName {
  name: string;
}

interface UpdatePassword {
  oldPassword: string;
  newPassword: string;
}

export const createSession = ({ email, password }: CreateSession) => {
  return axiosInstance.post("/session", {
    email: email,
    password: password,
  });
};

export const createUser = ({ name, email, password }: CreateUser) => {
  return axiosInstance.post("/user", {
    name: name,
    email: email,
    password: password,
  });
};

export const deleteSession = () => {
  return axiosInstance.delete("/session");
};

export const updateUsername = ({ name }: UpdateName) => {
  return axiosInstance.put("/user/@me", { name });
};

export const updatePassword = ({
  oldPassword,
  newPassword,
}: UpdatePassword) => {
  return axiosInstance.put("/user/@me/password", { oldPassword, newPassword });
};
