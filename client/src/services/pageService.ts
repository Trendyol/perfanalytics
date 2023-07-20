import axios from "axios";

interface CreatePage {
  url: string;
  device: string;
  domainId: string;
  tagId: string;
}

interface UpdatePage {
  url: string;
  device: string;
  tagId: string;
}

export const createPage = ({ domainId, url, device, tagId }: CreatePage) => {
  return axios.post("/page", {
    domainId: domainId,
    url: url,
    device: device,
    tagId: tagId
  });
};

export const updatePage = (id: string, { url, device, tagId }: UpdatePage) => {
  return axios.put(`/page/${id}`, {
    url: url,
    device: device,
    tag: tagId
  }); 
};

export const deletePage = (id: string) => {
  return axios.delete(`/page/${id}`);
};
