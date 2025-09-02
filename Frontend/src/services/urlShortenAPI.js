import apiClient from "./apiClient";

export async function shortenUrl(url, code) {
  try {
    const response = await apiClient.post("/shorten", {
      url,
      code: code || undefined,
    });
    return response.data;
  } catch (error) {
    console.log("Error in shortenUrl", error);
  }
}

export async function allUrls() {
  try {
    const respond = await apiClient.get("/codes");
    return respond.data;
  } catch (error) {
    console.log("Error in geting Urls", error);
  }
}


export async function deleteUrl(id){
  try {
    const respond= await apiClient.delete(`/${id}`)
    console.log(respond.data);
    

  } catch (error) {
    console.log("Error in Delete URL", error);
  }

}