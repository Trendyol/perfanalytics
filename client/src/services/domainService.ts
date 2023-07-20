import axios from 'axios';

interface CreateDomain {
  name: string;
  url: string;
}
interface UpdateDomain {
  name: string; 
  url: string;
}

export const createDomain = ({ name, url }: CreateDomain) => {
  return axios.post("/domain", {
    name: name,
    url: url,
  });
};

export const updateDomain = (id: string, { name, url }: UpdateDomain) => {
  return axios.put(`/domain/${id}`, {
    name: name,
    url: url,
  }); 
};

export const deleteDomain = (id: string) => {
  return axios.delete(`/domain/${id}`);
};
