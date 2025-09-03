import apiClient from "./apiClient";

export async function shortenUrl(url, code) {
  const { data } = await apiClient.post("/shorten", {
    url,
    code: code || undefined,
  });
  return data;
}

// get all urls
export async function allUrls() {
  const respond = await apiClient.get("/codes");
  return respond.data;
}

// delete url by id
export async function deleteUrl(id) {
  const respond = await apiClient.delete(`/${id}`);
  return respond.data; 
}
